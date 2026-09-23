import { useEffect } from "react";
import { useRouter } from "next/router";

const ThankYou = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const hasSuccess = router.query.success === "true";

    // 🚫 Direct access block
    if (!hasSuccess) {
      setTimeout(() => {
        router.replace("/");
      }, 1500);
      return;
    }

    // ✅ Google Ads conversion fire
    if (typeof window !== "undefined" && (window as any).gtag) {
      // Pehle ensure karein ki Google Ads tag loaded hai
      (window as any).gtag("event", "conversion", {
        send_to: "AW-17818948467/R9m_COmC--YbEPOm3rBC",
        value: 40.0,
        currency: "INR",
        transaction_id: `LEAD_${Date.now()}`, // Har conversion unique ho
      });
      
      console.log("✅ Google Ads conversion fired");
    } else {
      console.warn("❌ gtag not loaded yet");
    }
  }, [router.isReady, router.query.success]); 

  return (
    <div style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1>Thank You!</h1>
      <p>Your enquiry has been submitted successfully.</p>

      {/* Back to Home Button */}
      <button
        onClick={() => router.push("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ThankYou;