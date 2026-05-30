"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary] Erro detectado no componente "${this.props.name || "Desconhecido"}":`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 border border-brand-primary/20 bg-brand-primary/5 rounded-2xl text-center my-4">
          <p className="text-xs text-brand-primary font-mono uppercase tracking-wider">
            [DN System] Elemento visual dinâmico indisponível.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
