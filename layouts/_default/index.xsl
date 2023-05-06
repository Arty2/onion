{{- printf `<?xml version="1.0" encoding="UTF-8"?>` | safeHTML }}
<xsl:stylesheet version="3.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
>
		<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
		<xsl:template match="/">
				<html xmlns="http://www.w3.org/1999/xhtml">
						<head>
								<meta charset="UTF-8" />
								{{- printf `<title><xsl:value-of select="/rss/channel/title"/></title>` | safeHTML }}
								<meta name="viewport" content="width=device-width,initial-scale=1"/>
								{{- $inlineCSS := resources.Get "/styles/essential.css" | minify }}
								<style>{{ $inlineCSS.Content | safeCSS }}</style>
						</head>
						<body>
								<header>
										<h1>
	 										<a hreflang="en" target="_blank">
													<xsl:attribute name="href">
															<xsl:value-of select="/rss/channel/link"/>
													</xsl:attribute>
													<xsl:value-of select="/rss/channel/title"/>
											</a>
										</h1>
										<p><xsl:value-of select="/rss/channel/description"/></p>
										<p><small>{{ i18n "rss-about" | markdownify }}</small></p>
										<p><small>{{ i18n "rss-languages" | markdownify }}
										{{ if ne site.Params.show_languages false }}
											{{- $translations := .AllTranslations -}}
											{{- $len := (len $translations) -}}
											{{- range $index, $element := $translations }}
												{{- if eq $.Page.RelPermalink .RelPermalink -}}
													{{ .Site.Language.LanguageName }}
												{{- else -}}
													<a href="{{ replace (replace .Permalink "/styles" "") ".xsl" ".xml" }}" lang="{{ .Site.LanguageCode }}">{{ .Site.Language.LanguageName }}</a>
												{{- end -}}
												{{- if eq (add $index 1) $len }}.{{ else }}, {{ end -}}
											{{- end }}
										{{- end }}
										</small></p>
								</header>
								<hr/>
								<main>
										<xsl:for-each select="/rss/channel/item">
												<article>
														<h2 class="title">
																<a hreflang="en" target="_blank">
																		<xsl:attribute name="href">
																				<xsl:value-of select="link"/>
																		</xsl:attribute>
																		<xsl:value-of select="title"/>
																</a>
														</h2>
														<p class="summary"><xsl:value-of select="description"/></p>
												</article>
										</xsl:for-each>
								</main>
								<footer>
									<p><xsl:value-of select="/rss/channel/copyright"/></p>
								</footer>
						</body>
				</html>
		</xsl:template>
</xsl:stylesheet>