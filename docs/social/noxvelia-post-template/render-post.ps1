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

function Draw-CoverImage($g, $img, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $scale = [Math]::Max($w / $img.Width, $h / $img.Height)
  $srcW = $w / $scale
  $srcH = $h / $scale
  $srcX = ($img.Width - $srcW) / 2
  $srcY = ($img.Height - $srcH) / 2
  $clip = New-RoundRectPath $x $y $w $h $r
  $oldClip = $g.Clip
  $g.SetClip($clip)
  $dest = [System.Drawing.Rectangle]::new([int]$x, [int]$y, [int]$w, [int]$h)
  $g.DrawImage($img, $dest, [int]$srcX, [int]$srcY, [int]$srcW, [int]$srcH, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Clip = $oldClip
  $oldClip.Dispose()
  $clip.Dispose()
}

function Get-WrappedLines($g, [string]$text, $font, [float]$maxWidth, [int]$maxLines) {
  $words = $text -split "\s+"
  $lines = New-Object System.Collections.Generic.List[string]
  $line = ""

  foreach ($word in $words) {
    $candidate = if ($line.Length -eq 0) { $word } else { "$line $word" }
    if ($g.MeasureString($candidate, $font).Width -le $maxWidth) {
      $line = $candidate
    } else {
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

      if ($line.Length -gt 0) {
        $lines.Add($line)
      }
      $line = $word
    }
  }

  if ($line.Length -gt 0 -and $lines.Count -lt $maxLines) {
    $lines.Add($line)
  }

  return $lines
}

function Draw-CenteredWrappedText($g, [string]$text, $font, $brush, [float]$centerX, [float]$top, [float]$maxWidth, [float]$lineHeight, [int]$maxLines) {
  $lines = Get-WrappedLines $g $text $font $maxWidth $maxLines
  $y = $top
  foreach ($line in $lines) {
    $size = $g.MeasureString($line, $font)
    $g.DrawString($line, $font, $brush, $centerX - ($size.Width / 2), $y)
    $y += $lineHeight
  }
  return $y
}

function New-DefaultMiddleImage([string]$path) {
  $dir = Split-Path $path -Parent
  if (-not (Test-Path -LiteralPath $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }

  $bmp = [System.Drawing.Bitmap]::new(1500, 920)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(0, 0, 1500, 920),
    (Color-Html "#eff9ff"),
    (Color-Html "#fff6df"),
    25
  )
  $g.FillRectangle($bg, 0, 0, 1500, 920)
  $bg.Dispose()

  $tealGlow = [System.Drawing.SolidBrush]::new((Color-Html "#24d6a5" 58))
  $blueGlow = [System.Drawing.SolidBrush]::new((Color-Html "#2db7ff" 62))
  $goldGlow = [System.Drawing.SolidBrush]::new((Color-Html "#e3b64c" 70))
  $g.FillEllipse($blueGlow, -160, 230, 700, 480)
  $g.FillEllipse($tealGlow, 890, 120, 650, 560)
  $g.FillEllipse($goldGlow, 500, -220, 480, 390)

  $panelBrush = [System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 225))
  Fill-RoundRect $g 845 170 455 480 28 $panelBrush

  $glass = [System.Drawing.Pen]::new((Color-Html "#17456d" 145), 4)
  $windowPen = [System.Drawing.Pen]::new((Color-Html "#19b98f" 110), 2)
  $g.DrawRectangle($glass, 902, 220, 120, 170)
  $g.DrawRectangle($glass, 1040, 220, 170, 170)
  $g.DrawRectangle($glass, 902, 412, 308, 160)
  $g.DrawLine($windowPen, 1040, 220, 1040, 572)
  $g.DrawLine($windowPen, 902, 412, 1210, 412)

  $ground = [System.Drawing.SolidBrush]::new((Color-Html "#dff1f1" 230))
  $g.FillRectangle($ground, 0, 642, 1500, 278)

  $roadLine = [System.Drawing.Pen]::new((Color-Html "#16b89c" 160), 5)
  $g.DrawLine($roadLine, 80, 742, 1370, 705)
  $g.DrawLine(([System.Drawing.Pen]::new((Color-Html "#2d8dff" 120), 2)), 110, 798, 980, 782)

  $carBody = [System.Drawing.SolidBrush]::new((Color-Html "#ffffff"))
  $carHighlight = [System.Drawing.Pen]::new((Color-Html "#1677c7" 220), 7)
  $carGold = [System.Drawing.Pen]::new((Color-Html "#b99035" 160), 4)
  $bodyPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $bodyPath.AddBezier(185, 650, 275, 520, 575, 500, 735, 645)
  $bodyPath.AddBezier(735, 645, 790, 675, 735, 748, 630, 748)
  $bodyPath.AddLine(268, 748, 180, 715)
  $bodyPath.CloseFigure()
  $g.FillPath($carBody, $bodyPath)
  $g.DrawPath($carHighlight, $bodyPath)
  $g.DrawBezier($carGold, 276, 632, 390, 545, 545, 538, 680, 635)

  $wheelBrush = [System.Drawing.SolidBrush]::new((Color-Html "#102233"))
  $wheelPen = [System.Drawing.Pen]::new((Color-Html "#2db7ff" 170), 5)
  foreach ($wheel in @(@(288, 700), @(640, 700))) {
    $g.FillEllipse($wheelBrush, $wheel[0], $wheel[1], 118, 118)
    $g.DrawEllipse($wheelPen, $wheel[0] + 14, $wheel[1] + 14, 90, 90)
  }

  $head = [System.Drawing.Pen]::new((Color-Html "#153149" 160), 6)
  $g.DrawLine($head, 185, 686, 275, 670)
  $g.DrawLine(([System.Drawing.Pen]::new((Color-Html "#12b889" 180), 5)), 697, 677, 754, 683)

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

$root = Split-Path -Parent $ConfigPath
$config = Get-Content -LiteralPath $ConfigPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ([string]::IsNullOrWhiteSpace($OutPath)) {
  $OutPath = Join-Path $root $config.output
}

$logoPath = Join-Path $root "assets/logo-Noxvelia.png"
$middlePath = Join-Path $root $config.middleImage
if (-not (Test-Path -LiteralPath $middlePath)) {
  New-DefaultMiddleImage $middlePath
}

$outDir = Split-Path $OutPath -Parent
if (-not (Test-Path -LiteralPath $outDir)) {
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

$canvas = [System.Drawing.Bitmap]::new(1080, 1080)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(0, 0, 1080, 1080),
  (Color-Html "#f5fbff"),
  (Color-Html "#fff3d9"),
  45
)
$g.FillRectangle($bg, 0, 0, 1080, 1080)
$bg.Dispose()

$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#2db7ff" 70))), -250, 140, 610, 610)
$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#24d6a5" 72))), 760, 72, 500, 560)
$g.FillEllipse(([System.Drawing.SolidBrush]::new((Color-Html "#e3b64c" 62))), 180, -320, 690, 470)

$topCard = [System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 238))
Fill-RoundRect $g 54 40 972 148 34 $topCard
Stroke-RoundRect $g 54 40 972 148 34 ([System.Drawing.Pen]::new((Color-Html "#16324b" 24), 2))

$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoW = 138
$logoH = [int]($logo.Height * ($logoW / $logo.Width))
$g.DrawImage($logo, 82, 49, $logoW, $logoH)

$brandFont = [System.Drawing.Font]::new("Segoe UI", 46, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$smallFont = [System.Drawing.Font]::new("Segoe UI", 15, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$badgeFont = [System.Drawing.Font]::new("Segoe UI", 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$white = [System.Drawing.SolidBrush]::new((Color-Html "#071827"))
$muted = [System.Drawing.SolidBrush]::new((Color-Html "#496172"))
$gold = [System.Drawing.SolidBrush]::new((Color-Html "#a37a24"))
$g.DrawString("NOXVELIA", $brandFont, $white, 226, 64)
$tagline = if ($config.PSObject.Properties.Name -contains "tagline") { $config.tagline } else { "anuncios simples para todos" }
$g.DrawString($tagline, $smallFont, $gold, 232, 132)

$badgeBrush = [System.Drawing.SolidBrush]::new((Color-Html "#e8fff7" 240))
Fill-RoundRect $g 742 78 226 58 29 $badgeBrush
Stroke-RoundRect $g 742 78 226 58 29 ([System.Drawing.Pen]::new((Color-Html "#12b889" 165), 2))
$badgeSize = $g.MeasureString($config.badge, $badgeFont)
$g.DrawString($config.badge, $badgeFont, $white, 855 - ($badgeSize.Width / 2), 95)

$middle = [System.Drawing.Image]::FromFile($middlePath)
Draw-CoverImage $g $middle 90 226 900 506 42
$middle.Dispose()

$overlay = [System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 18))
Fill-RoundRect $g 90 226 900 506 42 $overlay
$borderBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(90, 226, 900, 506),
  (Color-Html "#1495dc"),
  (Color-Html "#c8962f"),
  0
)
$borderPen = [System.Drawing.Pen]::new($borderBrush, 4)
Stroke-RoundRect $g 90 226 900 506 42 $borderPen
$borderPen.Dispose()
$borderBrush.Dispose()

$pillBlue = [System.Drawing.SolidBrush]::new((Color-Html "#0f7fc1" 235))
$pillGreen = [System.Drawing.SolidBrush]::new((Color-Html "#0b9f78" 235))
Fill-RoundRect $g 128 668 156 44 22 $pillBlue
Fill-RoundRect $g 300 668 164 44 22 $pillGreen
$pillFont = [System.Drawing.Font]::new("Segoe UI", 14, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$g.DrawString("DRIVE", $pillFont, ([System.Drawing.SolidBrush]::new((Color-Html "#ffffff"))), 178, 681)
$g.DrawString("ESTATE", $pillFont, ([System.Drawing.SolidBrush]::new((Color-Html "#ffffff"))), 349, 681)

$phraseFont = [System.Drawing.Font]::new("Segoe UI", 39, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$supportFont = [System.Drawing.Font]::new("Segoe UI", 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Point)
$nextY = Draw-CenteredWrappedText $g $config.phrase $phraseFont $white 540 776 900 56 2
Draw-CenteredWrappedText $g $config.supportingLine $supportFont $muted 540 ($nextY + 12) 790 34 2 | Out-Null

$footerPen = [System.Drawing.Pen]::new((Color-Html "#071827" 34), 1)
$g.DrawLine($footerPen, 148, 996, 932, 996)
$footerFont = [System.Drawing.Font]::new("Segoe UI", 16, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
$g.DrawString("Drive. Estate.", $footerFont, $gold, 148, 1015)
$ctaSize = $g.MeasureString($config.cta, $footerFont)
$g.DrawString($config.cta, $footerFont, $white, 932 - $ctaSize.Width, 1015)

$canvas.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)

$logo.Dispose()
$g.Dispose()
$canvas.Dispose()

Write-Host "Exportado: $OutPath"
