import React, { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp } from 'lucide-react';
import { revenueData, transactions } from '../data/dummyData';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('7hari');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analytics</h1>
          <p className="text-gray-600">Analisis performa dan pendapatan restoran</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7hari">7 Hari Terakhir</option>
            <option value="30hari">30 Hari Terakhir</option>
            <option value="3bulan">3 Bulan Terakhir</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download className="h-5 w-5 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pendapatan Minggu Ini</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(revenueData.reduce((sum, day) => sum + day.revenue, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rata-rata Harian</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(revenueData.reduce((sum, day) => sum + day.revenue, 0) / revenueData.length)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hari Terbaik</p>
              <p className="text-lg font-bold text-gray-900">
                {revenueData.find(d => d.revenue === maxRevenue)?.day}
              </p>
              <p className="text-sm text-gray-500">{formatCurrency(maxRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Grafik Pendapatan Mingguan</h2>
        
        <div className="space-y-4">
          {revenueData.map((data) => (
            <div key={data.day} className="flex items-center">
              <div className="w-16 text-sm font-medium text-gray-600">{data.day}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4 relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-32 text-right text-sm font-medium text-gray-900">
                {formatCurrency(data.revenue)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Log */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Log Transaksi Terbaru</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.timestamp.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.quantity} item
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;