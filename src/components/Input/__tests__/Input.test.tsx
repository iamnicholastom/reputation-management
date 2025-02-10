import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "../Input";

describe("Input Component", () => {
  it("renders input element with all props correctly", () => {
    render(
      <Input
        name="username"
        label="Username"
        type="text"
        placeholder="Enter username"
        value=""
        onChange={() => {}}
        htmlFor="username"
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter username");
    const labelElement = screen.getByText("Username");

    expect(inputElement).toBeDefined();
    expect(labelElement).toBeDefined();
    expect(inputElement.getAttribute("type")).toBe("text");
    expect(inputElement.getAttribute("id")).toBe("username");
  });

  it("applies error styles and shows error message when error prop is provided", () => {
    render(
      <Input
        label="Username"
        name="username"
        value=""
        onChange={() => {}}
        error="This field is required"
        htmlFor="username"
      />
    );

    const inputElement = screen.getByRole("textbox");
    const errorMessage = screen.getByText("This field is required");

    expect(errorMessage).toBeDefined();
    expect(inputElement.className).includes("border-red-500");
  });

  it("calls onChange handler when value changes", () => {
    const handleChange = vi.fn();
    render(
      <Input
        name="username"
        label="Username"
        value=""
        onChange={handleChange}
        htmlFor="username"
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not render label when label prop is not provided", () => {
    render(
      <Input value="" name="username" onChange={() => {}} htmlFor="username" />
    );

    const labelElements = screen.queryByRole("label");
    expect(labelElements).toBeNull();
  });
});
