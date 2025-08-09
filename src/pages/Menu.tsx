import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';
import { menuItems } from '../data/dummyData';
import AddMenuModal from '../components/AddMenuModal';
import ViewMenuModal from '../components/ViewMenuModal';
import EditMenuModal from '../components/EditMenuModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { MenuItem } from '../types';

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('semua');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);
  const { showSuccess, showWarning, showError } = useNotification();

  const filteredItems = menuList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'semua' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddMenu = (newMenu: MenuItem) => {
    setMenuList(prev => [...prev, newMenu]);
  };

  const handleViewMenu = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsViewModalOpen(true);
  };

  const handleEditMenu = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsEditModalOpen(true);
  };

  const handleUpdateMenu = (updatedMenu: MenuItem) => {
    setMenuList(prev => prev.map(item => 
      item.id === updatedMenu.id ? updatedMenu : item
    ));
  };

  const handleDeleteMenu = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMenu = () => {
    if (!selectedMenuItem) return;
    
    try {
      setMenuList(prev => prev.filter(item => item.id !== selectedMenuItem.id));
      showWarning('Menu Dihapus', `Menu "${selectedMenuItem.name}" telah dihapus dari daftar`);
      setIsDeleteModalOpen(false);
      setSelectedMenuItem(null);
    } catch (error) {
      showError('Gagal Menghapus', 'Terjadi kesalahan saat menghapus menu');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const categoryCounts = {
    semua: menuList.length,
    makanan: menuList.filter(item => item.category === 'makanan').length,
    minuman: menuList.filter(item => item.category === 'minuman').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Menu</h1>
          <p className="text-gray-600">Kelola menu makanan dan minuman</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Tambah Menu
        </button>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        <div className="flex flex-wrap gap-1">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                categoryFilter === category
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Cari menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Image */}
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Tidak Tersedia</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.available ? 'Tersedia' : 'Habis'}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-blue-600">{formatCurrency(item.price)}</span>
                <span className="text-sm text-gray-500 capitalize">{item.category}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleViewMenu(item)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Lihat
                </button>
                <button 
                  onClick={() => handleEditMenu(item)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteMenu(item)}
                  className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada menu yang ditemukan</p>
        </div>
      )}

      {/* Add Menu Modal */}
      <AddMenuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMenu}
      />

      {/* View Menu Modal */}
      <ViewMenuModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        menuItem={selectedMenuItem}
      />

      {/* Edit Menu Modal */}
      <EditMenuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateMenu}
        menuItem={selectedMenuItem}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteMenu}
        menuItem={selectedMenuItem}
      />
    </div>
  );
};

export default Menu;