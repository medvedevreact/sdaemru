import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface RenderWithRouterOptions
  extends MemoryRouterProps,
    Omit<RenderOptions, "wrapper"> {}

export const renderWithRouter = (
  component: ReactElement,
  options: RenderWithRouterOptions = {}
) => {
  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <MemoryRouter {...options}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );

  return render(component, { wrapper: Wrapper, ...options });
};
