import { i18n } from "@lingui/core"

export async function loadTranslations(locale: string) {
    const catalog = await import(`../locales/${locale}.po`)
    i18n.loadAndActivate({ locale, messages: catalog.messages })
}
