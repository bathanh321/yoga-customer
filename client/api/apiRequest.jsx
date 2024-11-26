const apiURL = "http://192.168.33.158:8000"

export const login = async (email, password) => {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${apiURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${apiURL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${apiURL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

export const getAllClassTypes = async () => {
  try {
    const response = await fetch(`${apiURL}/class/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get all class types');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting all class types:', error);
    throw error;
  }
}

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${apiURL}/course/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get all courses');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting all courses:', error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await fetch(`${apiURL}/course/course/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get course by id');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting course by id:', error);
    throw error;
  }
};

export const getClassTypeById = async (id) => {
  try {
    const response = await fetch(`${apiURL}/class/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get class type by id');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting class type by id:', error);
    throw error;
  }
};

export const searchCourses = async (searchData) => {
  try {
    const response = await fetch(`${apiURL}/course/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchData),
    });

    if (!response.ok) {
      throw new Error('Failed to search courses');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching courses:', error);
    throw error;
  }
};

export const getAllClassesInCourse = async (courseId) => {
  try {
    const response = await fetch(`${apiURL}/class/${courseId}/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await fetch(`${apiURL}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get cart');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
}

export const addToCart = async (classId) => {
  try {
    const response = await fetch(`${apiURL}/cart/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ classId }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export const deleteItemInCart = async (itemId) => {
  try {
    const response = await fetch(`${apiURL}/cart/deleteItem/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete item in cart');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting item in cart:', error);
    throw error;
  }
}

export const checkout = async (total) => {
  try {
    const response = await fetch(`${apiURL}/order/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to checkout');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking out:', error);
    throw error;
  }
}