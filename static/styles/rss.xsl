<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
		<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
		<xsl:template match="/">
				<html xmlns="http://www.w3.org/1999/xhtml">
						<head>
								<meta charset="UTF-8" />
								<title><xsl:value-of select="/rss/channel/title"/></title>
								<meta name="viewport" content="width=device-width,initial-scale=1" />
								<link rel="stylesheet" href="/styles/essential.css" media="screen" />
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
								</header>
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