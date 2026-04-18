{{- printf `<?xml version="1.0" encoding="UTF-8"?>` | safeHTML }}
<xsl:stylesheet version="3.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
>
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{ .Language }}">
		<head>
				<meta charset="UTF-8" />
				{{- printf `<title><xsl:value-of select="/rss/channel/title"/></title>` | safeHTML }}
				<meta name="viewport" content="width=device-width,initial-scale=1"/>
				{{- with resources.Get "/styles/essential.css" | minify }}
				<style>{{ .Content | safeCSS }}</style>
				{{ end -}}
		</head>
		<body>
				<header>
					{{ if ne site.Params.show_languages false -}}
					{{ if hugo.IsMultilingual }}
						<nav class="languages" aria-label="{{ i18n "languages-available" | plainify }}" aria-role="navigation"><ul>
							{{- $xsl_file := replace .RelPermalink (printf `/%s/` .Language.Lang) "/" -}}
							{{- $rss_file := printf `%s%s` "/" (path.Base ($.OutputFormats.Get "rss").Permalink) -}}
							{{- range $index, $language := .AllTranslations }}
								<li><a rel="alternate" href="{{ replace .Permalink $xsl_file $rss_file }}" hreflang="{{ .Language }}" lang="{{ .Language }}" {{ if eq $.Page.RelPermalink .RelPermalink }}aria-current="page"{{ end }}>{{ .Language.LanguageName }}</a></li>
							{{- end }}
						</ul></nav>
					{{- end }}
					{{- end }}
					<h1>
						<a>
							<xsl:attribute name="href">
									<xsl:value-of select="/rss/channel/link"/>
							</xsl:attribute>
							<xsl:value-of select="/rss/channel/title"/>
						</a>
					</h1>
					<p><xsl:value-of select="/rss/channel/description"/></p>
					<aside class="alert">{{ i18n "rss-about" | .RenderString | safeHTML }}</aside>
				</header>
				<hr/>
				<main>
					<xsl:for-each select="/rss/channel/item">
							<article>
								<a hreflang="en" target="_blank">
									<xsl:attribute name="href">
											<xsl:value-of select="link"/>
									</xsl:attribute>
									<p class="taxa">
										<xsl:for-each select="category[@domain='types']"><span class="taxon type"><xsl:value-of select="."/></span></xsl:for-each>
										<xsl:for-each select="category[@domain='tags']"><span class="taxon tag"><xsl:value-of select="."/></span>
										</xsl:for-each>
									</p>
									<h2 class="title"><xsl:value-of select="title"/></h2>
									<p class="summary"><xsl:value-of select="description"/></p>
									<time class="time"><xsl:call-template name="format-date">
										<xsl:with-param name="date" select="pubDate"/>
									</xsl:call-template></time>
								</a>
							</article>
					</xsl:for-each>
				</main>
				<footer>
					<p><xsl:value-of select="/rss/channel/copyright"/></p>
				</footer>
		</body>
</html>
</xsl:template>
<xsl:template name="format-date">
		<xsl:param name="date"/>
		<xsl:variable name="day" select="substring-before(substring-after($date, ' '), ' ')"/>
		<xsl:variable name="monthName" select="substring-before(substring-after(substring-after($date, ' '), ' '), ' ')"/>
		<xsl:variable name="year" select="substring-before(substring-after(substring-after(substring-after($date, ' '), ' '), ' '), ' ')"/>
		<xsl:variable name="month">
			<xsl:choose>
				<xsl:when test="$monthName = 'Jan'">01</xsl:when>
				<xsl:when test="$monthName = 'Feb'">02</xsl:when>
				<xsl:when test="$monthName = 'Mar'">03</xsl:when>
				<xsl:when test="$monthName = 'Apr'">04</xsl:when>
				<xsl:when test="$monthName = 'May'">05</xsl:when>
				<xsl:when test="$monthName = 'Jun'">06</xsl:when>
				<xsl:when test="$monthName = 'Jul'">07</xsl:when>
				<xsl:when test="$monthName = 'Aug'">08</xsl:when>
				<xsl:when test="$monthName = 'Sep'">09</xsl:when>
				<xsl:when test="$monthName = 'Oct'">10</xsl:when>
				<xsl:when test="$monthName = 'Nov'">11</xsl:when>
				<xsl:when test="$monthName = 'Dec'">12</xsl:when>
				<xsl:otherwise/>
			</xsl:choose>
		</xsl:variable>
		<xsl:value-of select="concat($year,'-',$day,'-',$month)"/>
	</xsl:template>
</xsl:stylesheet>