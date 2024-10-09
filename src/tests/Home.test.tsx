import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Home } from "../pages/Home";

jest.mock("../components/Search/Search", () => ({
  Search: () => <div>Search Component</div>,
}));

jest.mock("../components/Gallery/Gallery", () => ({
  Gallery: () => <div>Gallery Component</div>,
}));

describe("Home component", () => {
  it("renders correctly and matches the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
