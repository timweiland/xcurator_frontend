import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

export function BaseInformationModal({
  isOpen,
  onClose,
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
}) {
  const okButtonRef = useRef(null);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={okButtonRef}
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={
                      "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 " +
                      (iconBgColor ?? "")
                    }
                  >
                    {icon &&
                      icon({
                        className: "h-6 w-6 " + iconColor,
                        "aria-hidden": "true",
                      })}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-bold text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                  ref={okButtonRef}
                >
                  OK
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export function InformationModal({ isOpen, onClose, title, description }) {
  return BaseInformationModal({
    isOpen: isOpen,
    onClose: onClose,
    icon: (props) => <InformationCircleIcon {...props} />,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    title: title,
    description: description,
  });
}

export function SuccessModal({ isOpen, onClose, title, description }) {
  return BaseInformationModal({
    isOpen: isOpen,
    onClose: onClose,
    icon: (props) => <CheckCircleIcon {...props} />,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    title: title,
    description: description,
  });
}

export function ErrorModal({ isOpen, onClose, title, description }) {
  return BaseInformationModal({
    isOpen: isOpen,
    onClose: onClose,
    icon: (props) => <ExclamationIcon {...props} />,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
    title: title,
    description: description,
  });
}
