// ProfileManagement.js
const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await axios.put('http://localhost:8081/api/users/update', updatedData);
      if (response.data && response.data.success) {
        // Handle successful profile update
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:8081/api/users/delete');
      if (response.data && response.data.success) {
        // Handle successful account deletion (e.g., redirect to login page)
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  