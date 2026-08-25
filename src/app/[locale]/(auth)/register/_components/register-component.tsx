"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useRegister } from "../_hooks/use-register";
import { useTranslations } from "next-intl";
import {
  RegistrationSchema,
  RegistrationSchemaType,
} from "@/lib/schemas/auth.schema";

export default function RegisterComponent() {
  //  Translation
  const t = useTranslations("register");

  // Mutation
  const { isPending, error, signup } = useRegister();

  // Form
  const form = useForm<RegistrationSchemaType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegistrationSchema(t)),
  });

  // functions
  const onSubmit = () => {
    signup(form.getValues());
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full">
        <div className="mb-10">
          <h3 className="font-edwardian text-4xl text-maroon-700 text-center dark:text-softPink-300">
            {t("heading")}
          </h3>
        </div>

        {/* INPUTS */}
        <div className=" border-t border-b border-zinc-300 pt-3 pb-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3 ">
                {/* FULL name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.firstName")}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Fady" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.lastName")}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Refaat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* The rest */}

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PHONE */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.phone")}</FormLabel>
                    <div className="grid grid-cols-1 !mt-0 ">
                      <FormControl>
                        <div className="flex">
                          <PhoneInput
                            className="w-full"
                            placeholder="01012345678"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.gender.gender")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">
                          {t("fields.gender.male")}
                        </SelectItem>
                        <SelectItem value="female">
                          {t("fields.gender.female")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.password")}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="*********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.confirmPassword")}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="*********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-red-500 text-center mt-2">
                  {error.message}{" "}
                </p>
              )}
              <Button
                disabled={isPending}
                type="submit"
                className="mt-6 w-full"
              >
                {isPending ? <Skeleton /> : t("fields.createAccount")}
              </Button>
            </form>
          </Form>
        </div>
        <p className="text-center text-sm mt-9 dark:text-white">
          {t("alreadyHaveAccount")}{" "}
          <Link
            href={"/login"}
            className="text-maroon-700 hover:underline dark:text-softPink-300"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
