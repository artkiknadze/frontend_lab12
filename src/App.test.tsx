import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App Integration Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test("header is rendered", () => {
    render(<App />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("show page is not loaded message", () => {
    render(<App />);
    expect(screen.getByText(/Сторінка не завантажена/i)).toBeInTheDocument();
  });

  test("display user data after button click", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() => {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            address: {
              geolocation: {
                lat: "-37.3159",
                long: "81.1496",
              },
              city: "kilcoole",
              street: "new road",
              number: 7682,
              zipcode: "12926-3874",
            },
            id: 1,
            email: "john@gmail.com",
            username: "johnd",
            password: "m38rmF$",
            name: {
              firstname: "john",
              lastname: "doe",
            },
            phone: "1-570-236-7033",
            __v: 0,
          }),
          {
            status: 200,
            headers: { "Content-type": "application/json" },
          }
        )
      );
    });

    render(<App />);
    fireEvent.click(screen.getByTestId("loadbutton"));

    expect(global.fetch).toBeCalledTimes(1);

    await screen.findByText('john doe');
    await screen.findByText('Пошта: john@gmail.com');
    await screen.findByText('Номер телефону: 1-570-236-7033');
  });
});
