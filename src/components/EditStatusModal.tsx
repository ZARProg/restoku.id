import React, { useState } from 'react';
import { X, Clock, ChefHat, CheckCircle, Archive } from 'lucide-react';
import { Order } from '../types';

interface EditStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onSave: (orderId: string, newStatus: Order['status']) => void;
}

const statusOptions = [
  { 
    value: 'menunggu' as const, 
    label: 'Menunggu', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    description: 'Pesanan baru masuk, menunggu diproses'
  },
  { 
    value: 'dimasak' as const, 
    label: 'Dimasak', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: ChefHat,
    description: 'Pesanan sedang dimasak di dapur'
  },
  { 
    value: 'siap' as const, 
    label: 'Siap', 
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    description: 'Pesanan siap disajikan ke meja'
  },
  { 
    value: 'selesai' as const, 
    label: 'Selesai', 
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: Archive,
    description: 'Pesanan telah selesai dan dibayar'
  }
];

const EditStatusModal: React.FC<EditStatusModalProps> = ({ isOpen, onClose, order, onSave }) => {
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>(order?.status || 'menunggu');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  const handleSave = async () => {
    if (!order) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulasi API call untuk update status
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (selectedStatus !== order.status) {
        onSave(order.id, selectedStatus);
        
        // Show success message
        alert(`Status pesanan ${order.orderNumber} berhasil diubah ke "${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}"`);
      }
      
      onClose();
    } catch (error) {
      alert('Gagal mengupdate status pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Status Pesanan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Nomor Pesanan</span>
              <span className="text-sm font-semibold text-gray-900">{order.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Meja</span>
              <span className="text-sm font-semibold text-gray-900">Meja {order.tableNumber}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Waktu</span>
              <span className="text-sm font-semibold text-gray-900">
                {order.timestamp.toLocaleTimeString('id-ID', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>

          {/* Status Options */}
          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Status Baru:
            </label>
            {statusOptions.map((status) => {
              const Icon = status.icon;
              return (
                <label
                  key={status.value}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedStatus === status.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={(e) => setSelectedStatus(e.target.value as Order['status'])}
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <div className={`p-2 rounded-lg mr-3 ${status.color.replace('text-', 'text-').replace('border-', 'bg-')}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{status.label}</span>
                        {selectedStatus === status.value && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{status.description}</p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting || selectedStatus === order?.status}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;