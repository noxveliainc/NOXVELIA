param(
  [string]$Root = $PSScriptRoot
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

function Draw-CoverImage($g, $img, [float]$x, [float]$y, [float]$w, [float]$h) {
  $scale = [Math]::Max($w / $img.Width, $h / $img.Height)
  $srcW = $w / $scale
  $srcH = $h / $scale
  $srcX = ($img.Width - $srcW) / 2
  $srcY = ($img.Height - $srcH) / 2
  $dest = [System.Drawing.Rectangle]::new([int]$x, [int]$y, [int]$w, [int]$h)
  $g.DrawImage($img, $dest, [int]$srcX, [int]$srcY, [int]$srcW, [int]$srcH, [System.Drawing.GraphicsUnit]::Pixel)
}

function Draw-Text($g, [string]$text, $font, $brush, [float]$x, [float]$y) {
  $g.DrawString($text, $font, $brush, $x, $y)
}

function Draw-Pill($g, [string]$text, [float]$x, [float]$y, [float]$w, [float]$h, $fill, $stroke, $font, $textBrush) {
  Fill-RoundRect $g $x $y $w $h ($h / 2) $fill
  Stroke-RoundRect $g $x $y $w $h ($h / 2) $stroke
  $size = $g.MeasureString($text, $font)
  $g.DrawString($text, $font, $textBrush, $x + (($w - $size.Width) / 2), $y + (($h - $size.Height) / 2) - 1)
}

function New-PageCard($item) {
  $width = 1200
  $height = 800
  $bgPath = Join-Path $Root $item.Background
  $logoPath = Join-Path $Root "assets/logo-Noxvelia.png"
  $outPath = Join-Path $Root $item.Output
  $outDir = Split-Path $outPath -Parent

  if (-not (Test-Path -LiteralPath $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
  }

  $canvas = [System.Drawing.Bitmap]::new($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $bg = [System.Drawing.Image]::FromFile($bgPath)
  Draw-CoverImage $g $bg 0 0 $width $height
  $bg.Dispose()

  $accent = Color-Html $item.Accent
  $accentSoft = [System.Drawing.Color]::FromArgb(218, $accent.R, $accent.G, $accent.B)
  $accentPale = [System.Drawing.Color]::FromArgb(60, $accent.R, $accent.G, $accent.B)
  $navy = Color-Html "#071827"
  $mutedColor = Color-Html "#496172"
  $goldColor = Color-Html "#a37a24"
  $whiteColor = Color-Html "#ffffff"

  $leftPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $leftPath.AddPolygon(@(
    [System.Drawing.PointF]::new(0, 0),
    [System.Drawing.PointF]::new(620, 0),
    [System.Drawing.PointF]::new(500, $height),
    [System.Drawing.PointF]::new(0, $height)
  ))
  $g.FillPath(([System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 230))), $leftPath)
  $leftPath.Dispose()

  $stripePath = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $stripePath.AddPolygon(@(
    [System.Drawing.PointF]::new(520, 0),
    [System.Drawing.PointF]::new(652, 0),
    [System.Drawing.PointF]::new(532, $height),
    [System.Drawing.PointF]::new(404, $height)
  ))
  $g.FillPath(([System.Drawing.SolidBrush]::new($accentPale)), $stripePath)
  $stripePath.Dispose()

  $logo = [System.Drawing.Image]::FromFile($logoPath)
  $logoW = 110
  $logoH = [int]($logo.Height * ($logoW / $logo.Width))
  $g.DrawImage($logo, 48, 38, $logoW, $logoH)

  $brandFont = [System.Drawing.Font]::new("Segoe UI", 37, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $tagFont = [System.Drawing.Font]::new("Segoe UI", 14, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $badgeFont = [System.Drawing.Font]::new("Segoe UI", 15, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $kickerFont = [System.Drawing.Font]::new("Segoe UI", 14, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $headlineFont = [System.Drawing.Font]::new("Segoe UI", 38, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $headlineLightFont = [System.Drawing.Font]::new("Segoe UI", 38, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Point)
  $supportFont = [System.Drawing.Font]::new("Segoe UI", 18, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Point)
  $ctaFont = [System.Drawing.Font]::new("Segoe UI", 18, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $smallFont = [System.Drawing.Font]::new("Segoe UI", 12, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Point)

  $navyBrush = [System.Drawing.SolidBrush]::new($navy)
  $mutedBrush = [System.Drawing.SolidBrush]::new($mutedColor)
  $goldBrush = [System.Drawing.SolidBrush]::new($goldColor)
  $whiteBrush = [System.Drawing.SolidBrush]::new($whiteColor)
  $accentBrush = [System.Drawing.SolidBrush]::new($accentSoft)
  $accentStroke = [System.Drawing.Pen]::new($accent, 2)

  Draw-Text $g "NOXVELIA" $brandFont $navyBrush 168 50
  Draw-Text $g $item.BrandLine $tagFont $goldBrush 172 110

  Draw-Pill $g $item.Badge 48 168 250 48 $accentBrush $accentStroke $badgeFont $whiteBrush

  $kickerBg = [System.Drawing.SolidBrush]::new((Color-Html "#071827" 215))
  Fill-RoundRect $g 48 258 318 42 8 $kickerBg
  Draw-Text $g $item.Kicker $kickerFont $whiteBrush 64 268

  Draw-Text $g $item.HeadlineA $headlineFont $navyBrush 48 332
  $aSize = $g.MeasureString($item.HeadlineA, $headlineFont)
  Draw-Text $g $item.HeadlineALight $headlineLightFont $navyBrush (48 + $aSize.Width + 10) 332
  Draw-Text $g $item.HeadlineB $headlineFont $navyBrush 48 386
  $bSize = $g.MeasureString($item.HeadlineB, $headlineFont)
  Draw-Text $g $item.HeadlineBLight $headlineLightFont $navyBrush (48 + $bSize.Width + 10) 386

  Draw-Text $g $item.Support $supportFont $mutedBrush 50 508
  $pillFill = [System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 245))
  $pillStroke = [System.Drawing.Pen]::new($accent, 3)
  Fill-RoundRect $g 48 558 244 54 27 $pillFill
  Stroke-RoundRect $g 48 558 244 54 27 $pillStroke
  Draw-Text $g $item.Cta $ctaFont $navyBrush 76 570

  Draw-Text $g "Drive. Estate." $smallFont $goldBrush 50 704
  Draw-Text $g "noxvelia.pt" $smallFont $navyBrush 50 730

  $cornerFill = [System.Drawing.SolidBrush]::new((Color-Html "#ffffff" 222))
  Fill-RoundRect $g 1052 38 92 54 18 $cornerFill
  $pinPen = [System.Drawing.Pen]::new($accent, 4)
  $g.DrawLine($pinPen, 1080, 67, 1115, 67)
  $g.DrawLine($pinPen, 1115, 67, 1101, 53)
  $g.DrawLine($pinPen, 1115, 67, 1101, 81)

  $canvas.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $logo.Dispose()
  $brandFont.Dispose()
  $tagFont.Dispose()
  $badgeFont.Dispose()
  $kickerFont.Dispose()
  $headlineFont.Dispose()
  $headlineLightFont.Dispose()
  $supportFont.Dispose()
  $ctaFont.Dispose()
  $smallFont.Dispose()
  $g.Dispose()
  $canvas.Dispose()

  Write-Host "Exportado: $outPath"
}

$gratis = "GR" + [char]0x00C1 + "TIS"
$imovel = "IM" + [char]0x00D3 + "VEL."

$items = @(
  [pscustomobject]@{
    Background = "assets/page-card-drive-bg.png"
    Output = "output/noxvelia-drive-page-card.png"
    Accent = "#1495dc"
    BrandLine = "anuncios auto simples"
    Badge = "ANUNCIA " + $gratis
    Kicker = "PARTICULARES E STANDS"
    HeadlineA = "COMPRAR"
    HeadlineALight = "CARRO."
    HeadlineB = "VENDER"
    HeadlineBLight = "CARRO."
    Support = "Publica gratis e chega a mais compradores."
    Cta = "www.noxvelia.pt"
  },
  [pscustomobject]@{
    Background = "assets/page-card-estate-bg.png"
    Output = "output/noxvelia-estate-page-card.png"
    Accent = "#0b9f78"
    BrandLine = "imoveis simples para todos"
    Badge = "ANUNCIA " + $gratis
    Kicker = "PARTICULARES E PROFISSIONAIS"
    HeadlineA = "COMPRAR"
    HeadlineALight = "CASA."
    HeadlineB = "VENDER"
    HeadlineBLight = $imovel
    Support = "Mostra o teu imovel de forma simples."
    Cta = "www.noxvelia.pt"
  }
)

foreach ($item in $items) {
  New-PageCard $item
}
