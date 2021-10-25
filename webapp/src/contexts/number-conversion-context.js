import * as React from 'react';

const NumberContext = React.createContext();

export default NumberContext;

export const NumberConvertorConsumer = NumberContext.Consumer;
export const NumberConvertorProvider = NumberContext.Provider;
