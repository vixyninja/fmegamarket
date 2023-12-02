import { LOCALES_MANAGER } from "@/assets";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const resource = {
  en: {
    translation: LOCALES_MANAGER.en_EN,
  },
  vi: {
    translation: LOCALES_MANAGER.vi_VN,
  },
};

i18next.use(initReactI18next).init(
  {
    compatibilityJSON: "v4",
    lng: "en",
    fallbackLng: "en",
    resources: resource,
    cache: {
      enabled: true,
    },
    cleanCode: true,
    i18nFormat: {
      localeData: "en",
      format: "json",
    },
  },
  (err, t) => {
    if (err) {
      console.log("Something went wrong loading", err);
    } else {
      console.log("Loaded translations", t);
    }
  },
);

export default i18next;
