import React from 'react';

const ProductList = ({ products, size = 'default', type = 'detailed' }: any) => {

  // Grid kolonka sonini aniqlash
  const getGridCols = () => {
    if (size === 'default') {
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    } else if (size === 'single') {
      return "grid-cols-1";
    }
  };

  // SINGLE ko‘rinish (ro‘yxat uslubi)
  if (size === 'single') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {products.map((product: any, index: number) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-6 py-4 border-b last:border-b-0">
            
            {/* Image */}
            <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Details */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                {product.title}
              </h3>

              {type === "detailed" && (
                <>
                  <p className="text-gray-700 text-2xl font-bold mb-2">
                    {product.price}
                  </p>
                  {product.available && (
                    <p className="text-green-600 text-sm mt-1">
                      В наличии
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Buy button faqat detailed bo‘lsa */}
            {type === "detailed" && (
              <div className="flex-shrink-0 mt-4 md:mt-0">
                <button className="flex items-center gap-2 px-6 py-2 rounded-md border border-orange-600 text-orange-600 font-medium hover:bg-orange-600 hover:text-white transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25h10.5l1.5-6.75H6.75m-1.644-2.978L6.75 14.25m0 0L5.25 18.75h12.75"
                    />
                  </svg>
                  Купить
                </button>
              </div>
            )}
            
          </div>
        ))}
      </div>
    );
  }

  // GRID card ko‘rinish
  return (
    <div className={`grid gap-12 ${getGridCols()}`}>
      {products.map((product: any, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
        >
          {/* Image */}
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-48 object-cover"
          />

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-800 mb-2 text-center">
              {product.title}
            </h3>

            {type === "detailed" && (
              <>
                <p className="text-gray-700 text-center text-lg font-semibold">
                  {product.price}
                </p>
                {product.available && (
                  <p className="text-green-600 text-sm text-center mt-1">
                    В наличии
                  </p>
                )}
              </>
            )}
          </div>

          {/* Buy Button faqat detailed bo‘lsa */}
          {type === "detailed" && (
            <div className="border-t p-3 flex justify-center">
              <button className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25h10.5l1.5-6.75H6.75m-1.644-2.978L6.75 14.25m0 0L5.25 18.75h12.75"
                  />
                </svg>
                Купить
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
