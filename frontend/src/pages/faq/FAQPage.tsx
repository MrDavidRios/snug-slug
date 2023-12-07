import sampleApartment from "../../assets/sampleListing.svg";
import sampleProfile from "../../assets/sampleProfile.svg";

export const FAQPage: React.FC = () => {
  return (
    <div id="faqPageWrapper">
      <div style={{ gap: 6 }}>
        <h1>ABOUT US</h1>
        <p className="italics">The trusted subleasing platform for our Columbia University community.</p>
      </div>
      <div>
        <h3 className="italics">What is Snug Slug?</h3>
        <p>
          Snug Slug is a subleasing platform designed for Columbia University affiliates to engage in safe, reliable,
          and trustworthy sublease agreements between each other. Users can enlist their apartment and/or find an
          apartment on their website.
        </p>
      </div>
      <div>
        <h3 className="italics">Is Snug Slug Safe?</h3>
        <p>
          Yes! Only Columbia affiliates are able to access this platform. Additionally, you will have access to their
          Columbia contacts.
        </p>
      </div>
      <div>
        <h3 className="italics">How can I engage in safe subleasing practices?</h3>
        <p>
          Always be careful with who you engage with for legal agreements, even it is a Columbia affiliate. Here are
          some links ot useful websites for you to learn more about safe subleasing practices:
        </p>
      </div>
      <img className="sample-card left" src={sampleApartment} alt="Sample decorative apartment listing" />
      <img className="sample-card right" src={sampleProfile} alt="Sample decorative profile listing" />
    </div>
  );
};
