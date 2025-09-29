export function adminGuard(to, from, next) {
  try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    console.log('Checking admin guard...');
    console.log('User data exists:', !!userStr);
    console.log('Token exists:', !!token);
    
    if (!userStr || !token) {
      console.log('No user data or token found');
      next({ name: 'login', query: { redirect: to.fullPath } });
      return;
    }

    const user = JSON.parse(userStr);
    console.log('Current user:', user);
    console.log('Token:', token);

    // Decode token để lấy thông tin role
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      console.log('Token payload:', tokenPayload);
      
      // Kiểm tra role từ cả user data và token
      const hasAdminRole = user.role === 'admin' || tokenPayload.role === 'admin';
      
      if (!hasAdminRole) {
        console.log('User is not admin');
        next({ name: 'home' });
        return;
      }
    } else {
      console.log('Invalid token format');
      next({ name: 'login' });
      return;
    }

    console.log('Admin access granted');
    next();
  } catch (error) {
    console.error('Error in admin guard:', error);
    next({ name: 'login' });
  }
}