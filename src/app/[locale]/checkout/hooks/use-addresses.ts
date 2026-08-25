import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Address, AddressFormData } from "@/lib/types/address";
import {
  getAddressesAction,
  deleteAddressAction,
  addAddressAction,
  updateAddressAction,
} from "@/lib/actions/address.actions";

// Query Keys
export const addressKeys = {
  all: ["addresses"] as const,
};

const defaultCoords = { lat: 30.0444, lng: 31.2357 };

// ============ useAddresses
export function useAddresses() {
  const {
    data: addresses = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: addressKeys.all,
    queryFn: async () => {
      const data = await getAddressesAction();
      return Array.isArray(data) ? data : [];
    },
  });

  return {
    addresses,
    loading,
    error: error instanceof Error ? error.message : null,
  };
}

//  useAddressForm
export function useAddressForm(fullName: string) {
  // State
  const [formData, setFormData] = useState<AddressFormData>({
    username: fullName,
    phone: "",
    city: "",
    street: "",
    lat: defaultCoords.lat.toString(),
    long: defaultCoords.lng.toString(),
  });

  const [mapPosition, setMapPosition] = useState(defaultCoords);

  // handlers
  const handleFormChange = (field: keyof AddressFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLocation = (lat: number, lng: number) => {
    setMapPosition({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      lat: lat.toString(),
      long: lng.toString(),
    }));
  };

  const resetForm = (custom?: Partial<AddressFormData>) => {
    setFormData({
      username: fullName,
      phone: "",
      city: "",
      street: "",
      lat: defaultCoords.lat.toString(),
      long: defaultCoords.lng.toString(),
      ...custom,
    });

    setMapPosition({
      lat: parseFloat(custom?.lat ?? defaultCoords.lat.toString()),
      lng: parseFloat(custom?.long ?? defaultCoords.lng.toString()),
    });
  };

  return {
    formData,
    mapPosition,
    handleFormChange,
    updateLocation,
    resetForm,
    setMapPosition,
  };
}

//  useAddressMutations 
export function useAddressMutations(onSuccess: () => void) {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: addressKeys.all });
    onSuccess();
  };

  const saveMutation = useMutation({
    mutationFn: async ({
      formData,
      editing,
    }: {
      formData: AddressFormData;
      editing: Address | null;
    }) => {
      const id = editing?._id ?? editing?.id;
      if (editing && id) {
        await updateAddressAction(id, formData);
      } else {
        await addAddressAction(formData);
      }
    },
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: async (addressId: string) => {
      await deleteAddressAction(addressId);
    },
    onSuccess: invalidate,
  });

  return {
    saveLoading: saveMutation.isPending,
    deleteLoading: deleteMutation.isPending,
    saveError:
      saveMutation.error instanceof Error ? saveMutation.error.message : null,
    deleteError:
      deleteMutation.error instanceof Error
        ? deleteMutation.error.message
        : null,
    handleSave: (formData: AddressFormData, editing: Address | null) =>
      saveMutation.mutate({ formData, editing }),
    handleDelete: (addressId: string) => deleteMutation.mutate(addressId),
  };
}
