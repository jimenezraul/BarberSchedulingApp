import React from "react";

const PriceTable = function (props) {
  return (
    <tbody className=" divide-y divide-gray-200 bg-gray-700">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-500">
          <div className="flex items-center">
            <div className="ml-4">
              <div className="text-sm text-gray-300 font-bold">
                {props.service}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <div className="text-sm text-gray-300 font-bold">
            ${props.price}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default PriceTable;