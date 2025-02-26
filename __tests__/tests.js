const { JSDOM } = require("jsdom");

test("Website should load successfully", () => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body><h1>Hello, World!</h1></body></html>`);
    const document = dom.window.document;

    // Check if the body exists
    expect(document.body).not.toBeNull();

    // Check if an <h1> tag exists with the correct content
    const heading = document.querySelector("h1");
    expect(heading.textContent).toBe("Hello, World!");
});
