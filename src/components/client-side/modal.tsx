
export default function Modal({
    onCloseModal,
    userInputs,
    selectedItems
}) {
  return (
    <div className="absolute z-50 h-screen flex justify-center items-center bg-gray-600/50">
  <div className="h-3/4 sm:h-1/2  flex flex-cols justify-center space-y-10 flex-col items-center max-w-3xl sm:m-10 m-4 sm:p-20 p-5 rounded-lg bg-white
  relative
  ">
    <h1 className="text-3xl font-bold">Thank you! Delivery is on its way </h1>
    <div>
      Summary of order:
      <div>
        <span>Purchased items</span>
        <div>
        {
            selectedItems.map((item) => (
                <div key={item.id}>
                    Name: {item.name}; Quantity: {item.quantity}; Price: ${item.price}
                </div>
            ))
        }
        </div>
        <div>
        <span>Total: ${selectedItems.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)),0)}</span>
        </div>
      </div>
        <div>
            <span>
                User Details:
            </span>
            <div className="flex flex-col">
                <span>Name: {userInputs.name}</span>
                <span>Mobile Number: {userInputs.mobileNumber}</span>
                <span>Email: {userInputs.email}</span>
                <span>Address: {userInputs.address}</span>
                <span>Notes: {userInputs.notes}</span>
            </div>
        </div>
    </div>

    <button className="p-2 bg-red-300 border border-red-950 rounded-md absolute -top-8 right-2" onClick={onCloseModal}>
      Close
    </button>
  </div>
</div>
  )
}
