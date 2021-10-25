import React, { createContext, useEffect } from 'react';
import i18n from 'i18next';
import { useQueryParams } from '../hooks/use-query-params';

const i18nContext = createContext();

// eslint-disable-next-line react/prop-types
const I18nProvider = ({ children }) => {
  const params = useQueryParams();

  useEffect(() => {
    if (params.get('i18n') === 'true') {
      i18n.changeLanguage('gibberish');
    } else {
      i18n.changeLanguage('en');
    }
  }, [params]);

  return <i18nContext.Provider>{children}</i18nContext.Provider>;
};

export { I18nProvider };
