import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders correctly with children", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);

    fireEvent.click(getByText("Click Me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <Button onClick={onClick} disabled>
        Click Me
      </Button>
    );

    fireEvent.click(getByText("Click Me"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(<Button className="custom-class">Click Me</Button>);
    expect(container.querySelector(".custom-class")).toBeDefined();
  });

  it("renders a disabled button when disabled prop is true", () => {
    const { getByRole } = render(<Button disabled>Click Me</Button>);
    expect(getByRole("button").hasAttribute("disabled")).toBe(true);
  });
});
