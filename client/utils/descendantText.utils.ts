const getDecendent = (body) => body.map((item) => item.children.map((child) => child.text));

export default getDecendent;
