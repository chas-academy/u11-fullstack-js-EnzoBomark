export const getDecendent = (body) => body.map((item) => item.children.map((child) => child.text));
