import React from 'react';
import { X } from 'lucide-react';
import { MenuItem } from '../types';

interface ViewMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
}

const ViewMenuModal: React.FC<ViewMenuModalProps> = ({ isOpen, onClose, menuItem }) => {
  if (!isOpen || !menuItem) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Detail Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={menuItem.image} 
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
            {!menuItem.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-medium text-lg">Tidak Tersedia</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nama Menu</label>
              <p className="text-lg font-semibold text-gray-900">{menuItem.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Harga</label>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(menuItem.price)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Kategori</label>
                <p className="text-gray-900 capitalize">{menuItem.category}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
              <p className="text-gray-900">{menuItem.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                menuItem.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {menuItem.available ? 'Tersedia' : 'Tidak Tersedia'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMenuModal;