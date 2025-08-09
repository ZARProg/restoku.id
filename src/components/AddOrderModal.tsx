import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { MenuItem, OrderItem } from '../types';

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableMenuItems: MenuItem[];
  onSave: (orderData: {
    tableNumber: number;
    items: OrderItem[];
    total: number;
  }) => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ isOpen, onClose, availableMenuItems, onSave }) => {
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuItems = availableMenuItems.filter(item => 
    item.available && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (menuItem: MenuItem) => {
    const existingItem = selectedItems.find(item => item.menuId === menuItem.id);
    
    if (existingItem) {
      setSelectedItems(prev => 
        prev.map(item => 
          item.menuId === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems(prev => [...prev, {
        menuId: menuItem.id,
        name: menuItem.name,
        quantity: 1,
        price: menuItem.price
      }]);
    }
  };

  const updateQuantity = (menuId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedItems(prev => prev.filter(item => item.menuId !== menuId));
    } else {
      setSelectedItems(prev => 
        prev.map(item => 
          item.menuId === menuId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSave = () => {
    if (selectedItems.length === 0) {
      alert('Pilih minimal satu item untuk pesanan');
      return;
    }

    onSave({
      tableNumber,
      items: selectedItems,
      total: calculateTotal()
    });

    // Reset form
    setTableNumber(1);
    setSelectedItems([]);
    setSearchTerm('');
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Tambah Pesanan Baru</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Menu Selection */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Meja
              </label>
              <input
                type="number"
                min="1"
                value={tableNumber}
                onChange={(e) => setTableNumber(parseInt(e.target.value) || 1)}
                className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenuItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span className="text-sm font-medium text-blue-600">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <button
                    onClick={() => addItem(item)}
                    className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Tambah
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 bg-gray-50 p-6 border-l border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
            
            {selectedItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Belum ada item dipilih</p>
            ) : (
              <div className="space-y-3 mb-6">
                {selectedItems.map((item) => (
                  <div key={item.menuId} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.menuId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.menuId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatCurrency(item.price)} /item
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedItems.length > 0 && (
              <>
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
                    <span>Total:</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Simpan Pesanan
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;