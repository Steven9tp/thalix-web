import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
}

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "BAAJLGkGZ29nfLxErPSMRtSCf9zrNRGEyVWJqk6jY7TGcCJ-cs25J_LaQUje1SNdthecZYSbaG3gYr4ICM";

export const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPayPalScript = () => {
      if ((window as any).paypal) {
        if (isMounted) setIsLoaded(true);
        return;
      }

      const scriptId = "paypal-sdk-script";
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (isMounted) setIsLoaded(true);
        });
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&components=buttons&enable-funding=card`;
      script.async = true;
      script.onload = () => {
        if (isMounted) setIsLoaded(true);
      };
      script.onerror = () => {
        if (isMounted) {
          setErrorMessage("No se pudo cargar el módulo de PayPal. Verifica tu conexión.");
        }
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !(window as any).paypal) return;

    // Clear previous rendered buttons
    containerRef.current.innerHTML = "";

    try {
      (window as any).paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "paypal",
          tagline: false
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: "USD"
                },
                description: "Compra en Thalix Creative Hub"
              }
            ]
          });
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            const details = await actions.order.capture();
            onSuccess(details);
          } catch (err) {
            console.error("Error capturing PayPal order:", err);
            onError?.(err);
          }
        },
        onError: (err: any) => {
          console.error("PayPal button error:", err);
          onError?.(err);
        }
      }).render(containerRef.current);
    } catch (e) {
      console.error("Error rendering PayPal buttons:", e);
    }
  }, [isLoaded, amount, onSuccess, onError]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[160px]">
      {errorMessage && (
        <p className="text-xs text-red-500 mb-3">{errorMessage}</p>
      )}

      {!isLoaded && !errorMessage && (
        <div className="flex flex-col items-center gap-3 py-6">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
          <p className="text-[10px] uppercase font-bold tracking-widest text-black/60">Cargando pasarela de PayPal...</p>
        </div>
      )}

      <div ref={containerRef} className="w-full max-w-sm z-10" />
    </div>
  );
};
