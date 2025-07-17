import type { MetadataRoute } from "next";
import type { Locale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const host = "https://intl-dm1svlm0f-herrjonas-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
	return [...getEntries("/"), ...getEntries("/pathnames")];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntries(href: Href) {
	return routing.locales.map((locale) => ({
		url: getUrl(href, locale),
		alternates: {
			languages: Object.fromEntries(
				routing.locales.map((cur) => [cur, getUrl(href, cur)]),
			),
		},
	}));
}

function getUrl(href: Href, locale: Locale) {
	const pathname = getPathname({ locale, href });
	return host + pathname;
}
