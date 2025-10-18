import type { GuestFormStore } from "../interfaces/zustand-stores/guestFormStore";

interface Props {
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone: string;
  shippingAddress: GuestFormStore["shippingAddress"];
  
  setGuestInfo: (data: Partial<GuestFormStore>) => void;

  errors?: {
    guestFirstName?: string;
    guestLastName?: string;
    guestEmail?: string;
    guestPhone?: string;
    shippingAddress?: {
      street?: string;
      postalCode?: string;
      city?: string;
    };
  };
}

const GuestOrderForm = ({
  guestFirstName,
  guestLastName,
  guestEmail,
  guestPhone,
  shippingAddress,
  setGuestInfo,
  errors,
}: Props) => {
  return (
    <section className="p-6 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-6 uppercase text-gray-800">TWOJE DANE</h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Imię *"
            value={guestFirstName}
            onChange={(e) => setGuestInfo({ guestFirstName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.guestFirstName && <p className="text-red-500 text-sm">{errors.guestFirstName}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Nazwisko *"
            value={guestLastName}
            onChange={(e) => setGuestInfo({ guestLastName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.guestLastName && <p className="text-red-500 text-sm">{errors.guestLastName}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="E-mail *"
            value={guestEmail}
            onChange={(e) => setGuestInfo({ guestEmail: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.guestEmail && <p className="text-red-500 text-sm">{errors.guestEmail}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Nr telefonu *"
            value={guestPhone}
            onChange={(e) => setGuestInfo({ guestPhone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.guestPhone && <p className="text-red-500 text-sm">{errors.guestPhone}</p>}
        </div>
      </div>

      <div className="mt-6 mb-4 text-sm">
        <span className="text-gray-600">Kraj dostawy: </span>
        <span className="font-semibold text-gray-800">Polska</span>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Ulica *"
            value={shippingAddress?.street ?? ""}
            onChange={(e) =>
              setGuestInfo({
                shippingAddress: { ...shippingAddress, street: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.shippingAddress?.street && <p className="text-red-500 text-sm">{errors.shippingAddress.street}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Miasto *"
            value={shippingAddress?.city ?? ""}
            onChange={(e) =>
              setGuestInfo({
                shippingAddress: { ...shippingAddress, city: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.shippingAddress?.city && <p className="text-red-500 text-sm">{errors.shippingAddress.city}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Kod pocztowy *"
            value={shippingAddress?.postalCode ?? ""}
            onChange={(e) =>
              setGuestInfo({
                shippingAddress: { ...shippingAddress, postalCode: e.target.value },
              })
            }
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors?.shippingAddress?.postalCode && (
            <p className="text-red-500 text-sm">{errors.shippingAddress.postalCode}</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default GuestOrderForm;
