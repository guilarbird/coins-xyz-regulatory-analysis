import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'BRL' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATE = 5.80; // USD to BRL rate (can be made dynamic later)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    // Check URL param first
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlCurrency = params.get('ccy')?.toUpperCase();
      if (urlCurrency === 'USD' || urlCurrency === 'BRL') {
        return urlCurrency as Currency;
      }
      
      // Then check localStorage
      const stored = localStorage.getItem('currency');
      if (stored === 'USD' || stored === 'BRL') {
        return stored as Currency;
      }
    }
    return 'BRL'; // default
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);
    }
  };

  const formatCurrency = (amount: number): string => {
    const value = currency === 'USD' ? amount / EXCHANGE_RATE : amount;
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    
    // Use compact notation for large numbers (e.g., 2.5M)
    if (value >= 1000000) {
      const millions = value / 1000000;
      return currency === 'BRL' 
        ? `R$ ${millions.toFixed(1)}M`
        : `$ ${millions.toFixed(1)}M`;
    }
    
    return formatter.format(value);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, exchangeRate: EXCHANGE_RATE }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
