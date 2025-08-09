import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';
import { MenuItem } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  menuItem: MenuItem | null;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  menuItem 
}) => {
  if (!isOpen || !menuItem) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Konfirmasi Hapus</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Apakah Anda yakin ingin menghapus menu berikut?
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <img 
                src={menuItem.image} 
                alt={menuItem.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{menuItem.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{menuItem.category}</p>
                <p className="text-sm font-medium text-blue-600">{formatCurrency(menuItem.price)}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">
              <strong>Peringatan:</strong> Tindakan ini tidak dapat dibatalkan. Menu akan dihapus secara permanen dari sistem.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;