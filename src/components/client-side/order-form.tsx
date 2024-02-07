"use client"

import { Product } from "@/types/product"
import { useSearchParams } from 'next/navigation'
import { useReducer, useState } from "react"
import Modal from "./modal"
import { useRouter } from 'next/navigation'

const InputField = (props) => {
  return (
    <input
        type="text"
        {...props}
        className="border border-green-950 rounded-md p-2"
        required
       />
  )
}

const initialState = {
  name: '',
  mobileNumber: '',
  email: '',
  address: '',
  notes: '',
}

type State = {
  name: string
  mobileNumber: string
  email: string
  address: string
  notes: string
}

type Action = {
  type: string;
  payload: {
    value: string
  }
}

function reducer(state: State, action: Action) {
  switch(action.type) {
    case 'NAME_CHANGE':
      return {
        ...state,
        name: action.payload!.value
      }
    case 'MOBILE_NUMBER_CHANGE':
        return {
          ...state,
          mobileNumber: action.payload!.value
        }

    case 'EMAIL_CHANGE':
      return {
        ...state,
        email: action.payload!.value
      }

    case 'ADDRESS_CHANGE':
      return {
        ...state,
        address: action.payload!.value
      }

    case 'NOTES_CHANGE':
      return {
        ...state,
        notes: action.payload!.value
      }
    default:
      return state;
  }
}

export default function OrderForm({ products }: { products: Product[]}) {
    const searchParams = useSearchParams()
    const ids = searchParams.getAll('id')
    const quantities = searchParams.getAll('quantity')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState)
    const router = useRouter()
    const selectedItems = ids.map((id, idx) => {
      const product = products.find((item) => item.id === id);

      return {
        ...product,
        quantity: quantities[idx]
      }
    })

    const handleSubmitClick = () => {
      setIsModalOpen(true)
    }

    const handleModalClose = () => {
      router.push('/')
    }

    return (
      <>
      <div className="flex flex-col container bg-white max-w-screen-sm p-4 mt-6">
        <div className="flex container gap-2">
          {
            selectedItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-1 p-4">
                <span>Product: {item.name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price}</span>
                <span>Total: ${Number(item.price) * Number(item.quantity)}</span>
              </div>
            ))
          }
        </div>
        <span>Total: ${selectedItems.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity)),0)}</span>

        <div className="container flex flex-col gap-2">
          <InputField
             placeholder="Name"
              name="name"
              value={state.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({
              type: 'NAME_CHANGE',
              payload: {
                value: event.target.value
              }
            })}/>

          <InputField
              placeholder="Mobile number"
              name="mobileNumber"
              value={state.mobileNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({
              type: 'MOBILE_NUMBER_CHANGE',
              payload: {
                value: event.target.value
              }
            })}/>

          <InputField
              placeholder="Email"
              type="email"
              name="email"
              value={state.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({
              type: 'EMAIL_CHANGE',
              payload: {
                value: event.target.value
              }
            })}/>

          <InputField
              placeholder="Address"
              type="text"
              name="address"
              value={state.address}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch({
              type: 'ADDRESS_CHANGE',
              payload: {
                value: event.target.value
              }
            })}/>

          <textarea
              className="border border-green-950 rounded-md p-2"
              placeholder="Notes"
              name="notes"
              value={state.notes}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({
              type: 'NOTES_CHANGE',
              payload: {
                value: event.target.value
              }
            })}/>

            <button
              onClick={handleSubmitClick}
              className="border border-green-800 text-white rounded bg-green-800 p-3 font-bold">
                Submit Order
            </button>
        </div>
      </div>
      {isModalOpen && <Modal userInputs={state} selectedItems={selectedItems} onCloseModal={handleModalClose} />}
      </>
    )
}
