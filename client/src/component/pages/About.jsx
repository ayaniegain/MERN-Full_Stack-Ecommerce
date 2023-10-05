import React from "react";
import Layout from "../layout/Layout";
import about from "../../assets/images/about.jpg";

function About() {
  return (
    <Layout title={"about"}>
      <div className="container mx-auto p-10">
        <div className="flex flex-col md:flex-row  md:space-x-8">
          <div className="md:w-1/2">
            <img
              src={about}
              alt="About Us"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <section className="bg-gray-100 py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-6">About Us</h2>
                <p className="text-gray-700 mb-6">
                  Welcome to Krazy Kart, your one-stop destination for all
                  things karting! At Krazy Kart, we are passionate about
                  providing high-quality karting products and an exceptional
                  karting experience for enthusiasts of all levels.
                </p>
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  Our mission is to make karting accessible and enjoyable for
                  everyone. Whether you're a seasoned racer or a beginner, we
                  have the products, knowledge, and support you need to take
                  your karting adventures to the next level.
                </p>
                <h3 className="text-xl font-semibold mb-4">
                  Why Choose Krazy Kart?
                </h3>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li className="mb-2">
                    Quality Products: We offer a wide range of karts,
                    accessories, and safety gear from top brands to ensure you
                    have the best equipment for your needs.
                  </li>
                  <li className="mb-2">
                    Expert Guidance: Our team consists of karting enthusiasts
                    and experts who are ready to assist you in selecting the
                    right products and providing technical support.
                  </li>
                  <li className="mb-2">
                    Community: Join our thriving karting community, where you
                    can connect with fellow racers, share experiences, and stay
                    updated on the latest trends.
                  </li>
                </ul>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-700">
                  If you have any questions or need assistance, feel free to{" "}
                  <a href="" className="text-blue-600 hover:underline">
                    contact us
                  </a>
                  . We look forward to serving you and helping you make your
                  karting dreams a reality!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
