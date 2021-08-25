const API_BASE = 'http://localhost:5000/api/';

export const POST = async (apiRoute: string, values: any) => {
  const response = await fetch(`${API_BASE}${apiRoute}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localStorage.get('token')}`,
    },
    body: JSON.stringify(values),
  });

  try {
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const GET = () => {};
export const PUT = () => {};
export const DELETE = () => {};
