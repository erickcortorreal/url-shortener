import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
  it("renders correctly with provided value", () => {
    const { getByDisplayValue } = render(
      <Input value="Hello" onChange={() => {}} />
    );
    expect(getByDisplayValue("Hello")).toBeDefined();
  });

  it("calls onChange when input value is changed", () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <Input value="" onChange={handleChange} placeholder="Type here" />
    );

    const input = getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders with correct type", () => {
    const { getByPlaceholderText } = render(
      <Input type="password" value="" onChange={() => {}} placeholder="Enter password" />
    );

    const input = getByPlaceholderText("Enter password");
    expect(input.getAttribute("type")).toBe("password");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Input value="" onChange={() => {}} className="custom-class" />
    );

    expect(container.querySelector(".custom-class")).toBeDefined();
  });

  it("renders with a placeholder", () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChange={() => {}} placeholder="Enter text" />
    );

    expect(getByPlaceholderText("Enter text")).toBeDefined();
  });
});
