param(
  [string]$ConfigPath = (Join-Path $PSScriptRoot "post-config.json"),
  [string]$OutPath = ""
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

function Color-Html([string]$value, [int]$alpha = 255) {
  $base = [System.Drawing.ColorTranslator]::FromHtml($value)
  return [System.Drawing.Color]::FromArgb($alpha, $base.R, $base.G, $base.B)
}

function New-RoundRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-RoundRect($g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r, $brush) {
  $path = New-RoundRectPath $x $y $w $h $r
  $g.FillPath($brush, $path)
  $path.Dispose()
}

function Stroke-RoundRect($g, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r, $pen) {
  $path = New-RoundRectPath $x $y $w $h $r
  $g.DrawPath($pen, $path)
  $path.Dispose()
}

function Fill-Polygon($g, [array]$points, $brush) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddPolygon($points)
  $g.FillPath($brush, $path)
  $path.Dispose()
}

function Draw-ContainImage($g, $img, [float]$x, [float]$y, [float]$w, [float]$h) {
  $scale = [Math]::Min($w / $img.Width, $h / $img.Height)
  $destW = $img.Width * $scale
  $destH = $img.Height * $scale
  $destX = $x + (($w - $destW) / 2)
  $destY = $y + (($h - $destH) / 2)
  $dest = [System.Drawing.RectangleF]::new($destX, $destY, $destW, $destH)
  $g.DrawImage($img, $dest)
}

function Get-WrappedLines($g, [string]$text, $font, [float]$maxWidth, [int]$maxLines) {
  $words = ($text.Trim() -split "\s+")
  $lines = New-Object System.Collections.Generic.List[string]
  $line = ""

  foreach ($word in $words) {
    $candidate = if ($line.Length -eq 0) { $word } else { "$line $word" }
    if ($g.MeasureString($candidate, $font).Width -le $maxWidth) {
      $line = $candidate
      continue
    }

    if ($line.Length -gt 0) {
      if ($lines.Count -ge ($maxLines - 1)) {
        while ($line.Length -gt 0 -and $g.MeasureString("$line...", $font).Width -gt $maxWidth) {
          $parts = $line -split "\s+"
          if ($parts.Count -le 1) {
            $line = $line.Substring(0, [Math]::Max(0, $line.Length - 2))
          } else {
            $line = ($parts[0..($parts.Count - 2)] -join " ")
          }
        }
        $line = "$line..."
        break
      }

      $lines.Add($line)
    }

    $line = $word
  }

  if ($line.Length -gt 0 -and $lines.Count -lt $maxLines) {
    $lines.Add($line)
  }

  return $lines
}

function Draw-WrappedText($g, [string]$text, $font, $brush, [float]$x, [float]$y, [float]$maxWidth, [float]$lineHeight, [int]$maxLines) {
  if ([string]::IsNullOrWhiteSpace($text)) {
    return $y
  }

  $lines = Get-WrappedLines $g $text $font $maxWidth $maxLines
  $cursor = $y
  foreach ($line in $lines) {
    $g.DrawString($line, $font, $brush, $x, $cursor)
    $cursor += $lineHeight
  }
  return $cursor
}

function Draw-CenteredWrappedText($g, [string]$text, $font, $brush, [float]$centerX, [float]$y, [float]$maxWidth, [float]$lineHeight, [int]$maxLines) {
  if ([string]::IsNullOrWhiteSpace($text)) {
    return $y
  }

  $lines = Get-WrappedLines $g $text $font $maxWidth $maxLines
  $cursor = $y
  foreach ($line in $lines) {
    $size = $g.MeasureString($line, $font)
    $g.DrawString($line, $font, $brush, $centerX - ($size.Width / 2), $cursor)
    $cursor += $lineHeight
  }
  return $cursor
}

function Draw-Pill($g, [string]$text, [float]$x, [float]$y, [float]$w, [float]$h, $fill, $stroke, $font, $textBrush) {
  Fill-RoundRect $g $x $y $w $h ($h / 2) $fill
  if ($null -ne $stroke) {
    Stroke-RoundRect $g $x $y $w $h ($h / 2) $stroke
  }
  $size = $g.MeasureString($text, $font)
  $g.DrawString($text, $font, $textBrush, $x + (($w - $size.Width) / 2), $y + (($h - $size.Height) / 2) - 1)
}

function Get-ConfigValue($config, [string]$name, [string]$fallback) {
  if ($config.PSObject.Properties.Name -contains $name) {
    $value = [string]$config.$name
    if (-not [string]::IsNullOrWhiteSpace($value)) {
      return $value
    }
  }
  return $fallback
}

$root = Split-Path -Parent $ConfigPath
$config = Get-Content -LiteralPath $ConfigPath -Raw -Encoding UTF8 | ConvertFrom-Json

if ([string]::IsNullOrWhiteSpace($OutPath)) {
  $OutPath = Join-Path $root (Get-ConfigValue $config "output" "output/noxvelia-post.png")
}

$outDir = Split-Path $OutPath -Parent
if (-not (Test-Path -LiteralPath $outDir)) {
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$logoPath = Join-Path $root "assets/logo-Noxvelia.png"
$assetRel = Get-ConfigValue $config "contentAsset" ""
if ([string]::IsNullOrWhiteSpace($assetRel)) {
  $assetRel = Get-ConfigValue $config "middleImage" ""
}
$assetPath = if ([string]::IsNullOrWhiteSpace($assetRel)) { "" } else { Join-Path $root $assetRel }

$topPhrase = Get-ConfigValue $config "topPhrase" (Get-ConfigValue $config "headline" (Get-ConfigValue $config "phrase" (Get-ConfigValue $config "tagline" "Anuncia gratis, rapido e descomplicado")))
$brandLine = Get-ConfigValue $config "brandLine" "anuncios simples para todos"
$cta = Get-ConfigValue $config "cta" "noxvelia.com"

$canvas = [System.Drawing.Bitmap]::new(1080, 1080)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear((Color-Html "#061417"))

$bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(0, 0, 1080, 1080),
  (Color-Html "#061417"),
  (Color-Html "#0f2b31"),
  38
)
$g.FillRectangle($bg, 0, 0, 1080, 1080)
$bg.Dispose()

$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#2db7ff" 42))), -250, 170, 620, 620)
$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#2ac1b4" 50))), 710, 64, 600, 640)
$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#c6a86a" 40))), 250, -310, 600, 470)
$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#071827" 142))), 460, 260, 780, 620)

Fill-Polygon $g @(
  [System.Drawing.PointF]::new(0, 760),
  [System.Drawing.PointF]::new(1080, 520),
  [System.Drawing.PointF]::new(1080, 1080),
  [System.Drawing.PointF]::new(0, 1080)
) ([System.Drawing.SolidBrush]::new((Color-Html "#02080d" 72)))

Fill-Polygon $g @(
  [System.Drawing.PointF]::new(0, 0),
  [System.Drawing.PointF]::new(360, 0),
  [System.Drawing.PointF]::new(125, 1080),
  [System.Drawing.PointF]::new(0, 1080)
) ([System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 10)))

$white = [System.Drawing.SolidBrush]::new((Color-Html "#ecfdfb"))
$muted = [System.Drawing.SolidBrush]::new((Color-Html "#b7c7cb"))
$soft = [System.Drawing.SolidBrush]::new((Color-Html "#8fb3b7"))
$gold = [System.Drawing.SolidBrush]::new((Color-Html "#d2b26b"))
$navy = [System.Drawing.SolidBrush]::new((Color-Html "#061417"))
$teal = [System.Drawing.SolidBrush]::new((Color-Html "#2ac1b4"))

$brandFont = [System.Drawing.Font]::new("Segoe UI", 43, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$taglineFont = [System.Drawing.Font]::new("Segoe UI", 14, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$headlineFont = [System.Drawing.Font]::new("Segoe UI", 45, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$footerFont = [System.Drawing.Font]::new("Segoe UI", 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)

$logo = [System.Drawing.Image]::FromFile($logoPath)

Draw-CenteredWrappedText $g $topPhrase $headlineFont $white 540 108 910 58 3 | Out-Null

if (-not [string]::IsNullOrWhiteSpace($assetPath) -and (Test-Path -LiteralPath $assetPath)) {
  $asset = [System.Drawing.Image]::FromFile($assetPath)
  Draw-ContainImage $g $asset 150 300 780 390
  $asset.Dispose()
}

$logoW = 132
$logoH = [int]($logo.Height * ($logoW / $logo.Width))
$brandSize = $g.MeasureString("NOXVELIA", $brandFont)
$brandBlockW = $logoW + 24 + $brandSize.Width
$brandX = 540 - ($brandBlockW / 2)
$brandY = 810
$g.DrawImage($logo, $brandX, $brandY - 4, $logoW, $logoH)
$g.DrawString("NOXVELIA", $brandFont, $white, $brandX + $logoW + 24, $brandY + 18)

$brandLineSize = $g.MeasureString($brandLine, $taglineFont)
$g.DrawString($brandLine, $taglineFont, $gold, 540 - ($brandLineSize.Width / 2), 910)

if (-not [string]::IsNullOrWhiteSpace($cta)) {
  $ctaSize = $g.MeasureString($cta, $footerFont)
  $g.DrawString($cta, $footerFont, $muted, 540 - ($ctaSize.Width / 2), 954)
}

$canvas.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)

$logo.Dispose()
$brandFont.Dispose()
$taglineFont.Dispose()
$headlineFont.Dispose()
$footerFont.Dispose()
$g.Dispose()
$canvas.Dispose()

Write-Host "Exportado: $OutPath"
