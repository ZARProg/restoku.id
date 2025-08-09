import React, { useState } from 'react';
import { Save, User, MapPin, Phone, Mail, Key, Users } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';
import { restaurantInfo, users } from '../data/dummyData';

const Settings: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState(restaurantInfo);
  const [activeTab, setActiveTab] = useState('restaurant');
  const [isSaving, setIsSaving] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'staff' as 'admin' | 'staff',
    password: ''
  });
  const [userList, setUserList] = useState(users);
  const { showSuccess, showError } = useNotification();

  const handleRestaurantChange = (field: string, value: string) => {
    setRestaurantData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    try {
      // Validasi data restoran
      if (!restaurantData.name.trim()) {
        setIsSaving(false);
        showError('Validasi Gagal', 'Nama restoran harus diisi');
        return;
      }
      if (!restaurantData.phone.trim()) {
        setIsSaving(false);
        showError('Validasi Gagal', 'Nomor telepon harus diisi');
        return;
      }
      if (!restaurantData.email.trim()) {
        setIsSaving(false);
        showError('Validasi Gagal', 'Email harus diisi');
        return;
      }
      if (!restaurantData.address.trim()) {
        setIsSaving(false);
        showError('Validasi Gagal', 'Alamat harus diisi');
        return;
      }

      // Simulasi proses penyimpanan dengan delay
      setTimeout(() => {
        setIsSaving(false);
        showSuccess(
          'Pengaturan Berhasil Disimpan',
          'Semua perubahan telah disimpan dengan sukses'
        );
      }, 1000);
      
    } catch (error) {
      setIsSaving(false);
      showError('Gagal Menyimpan', 'Terjadi kesalahan saat menyimpan pengaturan');
    }
  };

  const handleAddUser = () => {
    try {
      // Validasi form user baru
      if (!newUser.username.trim()) {
        showError('Validasi Gagal', 'Username harus diisi');
        return;
      }
      if (!newUser.email.trim()) {
        showError('Validasi Gagal', 'Email harus diisi');
        return;
      }
      if (!newUser.password.trim()) {
        showError('Validasi Gagal', 'Password harus diisi');
        return;
      }

      // Cek apakah username sudah ada
      if (userList.some(user => user.username === newUser.username)) {
        showError('Username Sudah Ada', 'Username tersebut sudah digunakan');
        return;
      }

      // Cek apakah email sudah ada
      if (userList.some(user => user.email === newUser.email)) {
        showError('Email Sudah Ada', 'Email tersebut sudah digunakan');
        return;
      }

      // Tambah user baru
      const newUserData = {
        id: Date.now().toString(),
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      };

      setUserList(prev => [...prev, newUserData]);
      setNewUser({ username: '', email: '', role: 'staff', password: '' });
      setShowAddUserModal(false);
      
      showSuccess(
        'User Berhasil Ditambahkan',
        `User "${newUser.username}" telah ditambahkan ke sistem`
      );
    } catch (error) {
      showError('Gagal Menambah User', 'Terjadi kesalahan saat menambahkan user');
    }
  };

  const handleResetPassword = (userId: string, username: string) => {
    try {
      // Simulasi reset password
      const newPassword = Math.random().toString(36).slice(-8);
      
      showSuccess(
        'Password Berhasil Direset',
        `Password baru untuk "${username}": ${newPassword}`
      );
    } catch (error) {
      showError('Gagal Reset Password', 'Terjadi kesalahan saat mereset password');
    }
  };

  const handleDeleteUser = (userId: string, username: string) => {
    try {
      if (userList.length <= 1) {
        showError('Tidak Dapat Menghapus', 'Minimal harus ada satu user dalam sistem');
        return;
      }

      setUserList(prev => prev.filter(user => user.id !== userId));
      showSuccess(
        'User Berhasil Dihapus',
        `User "${username}" telah dihapus dari sistem`
      );
    } catch (error) {
      showError('Gagal Menghapus User', 'Terjadi kesalahan saat menghapus user');
    }
  };

  const tabs = [
    { id: 'restaurant', label: 'Informasi Restoran', icon: MapPin },
    { id: 'users', label: 'Manajemen User', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600">Kelola pengaturan sistem restoran</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'restaurant' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Restoran</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Nama Restoran
                    </label>
                    <input
                      type="text"
                      value={restaurantData.name}
                      onChange={(e) => handleRestaurantChange('name', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama restoran"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={restaurantData.phone}
                      onChange={(e) => handleRestaurantChange('phone', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Alamat
                    </label>
                    <textarea
                      value={restaurantData.address}
                      onChange={(e) => handleRestaurantChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={restaurantData.email}
                      onChange={(e) => handleRestaurantChange('email', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan email restoran"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                    isSaving 
                      ? 'bg-blue-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                  }`}
                >
                  <Save className={`h-5 w-5 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
                  {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Manajemen User</h2>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <User className="h-5 w-5 mr-2" />
                  Tambah User
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userList.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleResetPassword(user.id, user.username)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Key className="h-4 w-4 mr-1" />
                              Reset Password
                            </button>
                            {userList.length > 1 && (
                              <button 
                                onClick={() => handleDeleteUser(user.id, user.username)}
                                className="text-red-600 hover:text-red-900 flex items-center ml-4"
                              >
                                <User className="h-4 w-4 mr-1" />
                                Hapus
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Tambah User Baru</h2>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setNewUser({ username: '', email: '', role: 'staff', password: '' });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <User className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as 'admin' | 'staff' }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setNewUser({ username: '', email: '', role: 'staff', password: '' });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleAddUser}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <User className="h-4 w-4 mr-2" />
                Tambah User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;