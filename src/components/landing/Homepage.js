import React from 'react';
import '../../css/landing/Homepage.css';

import hero from '../../img/hero.svg';
import openEnded from '../../img/open-ended.svg';
import propertyBased from '../../img/property-based.svg';
import flexible from '../../img/flexible.svg';
import free from '../../img/free.svg';

function Homepage() {
  return (
    <main className="homepage">
      <section className="landing">
        <img src={hero} alt="A group of people talking." />
        <div className="capture">
          <h1>Explore the world's languages.</h1>
          <span className="lede">TerraLing brings the power of open-source knowledge to your dataset. Let linguists and native speakers from around the world offer you insight into your data.</span>
          <a href="sign_up" className="cta">Sign up for Terraling</a>
        </div>
      </section>
      <section id="what-is">
        <h2>What is TerraLing?</h2>
        <span className="h-divider"></span>
        <div className="what-is-card">
          <img src={openEnded} alt="A person staring outside a window." />
          <div className="copy">
            <h3>Open-access</h3>
            <p>
              TerraLing is a collection of searchable linguistic databases. You can discover which properties — morphological, syntactic, and semantic — characterize a language, and how these properties relate across languages. This system
              is designed to be <strong>open access</strong> and <strong>open-ended</strong>.
            </p>
          </div>
        </div>
        <span className="h-divider"></span>
        <div className="what-is-card right">
          <img src={propertyBased} alt="Two neighbors talking to each other." />
          <div className="copy">
            <h3>Property-based</h3>
            <p>
              TerraLing provides a framework allowing you to formulate queries as properties. Native speaker linguists can answer your queries for specific languages. Properties define the task and the values, which are illustrated
              by user-contributed examples.
            </p>
          </div>
        </div>
        <span className="h-divider"></span>
        <div className="what-is-card">
          <img src={flexible} alt="A person looking at a kanban board." />
          <div className="copy">
            <h3>Flexible</h3>
            <p>
              TerraLing is a flexible tool designed to support research. You can set up your own datasets, then gather and explore the data using built-in search functionality. Searches are robust, and can be saved, downloaded, or visualized.
            </p>
          </div>
        </div>
        <span className="h-divider"></span>
        <div className="what-is-card right">
          <img src={free} alt="A person looking at an abstract artwork." />
          <div className="copy">
            <h3>Free</h3>
            <p>
              Anyone can use the database to explore public data and perform basic searches. To get access to more groups and search features, <a href="sign_up">sign up for an account</a>.
            </p>
          </div>
        </div>
        <span className="h-divider"></span>
      </section>
      <section id="teams">
        <div className="card">
          <div>
            <h2>Working with a team?</h2>
            <p>
              Our new Teams feature can help you organize all of your citable research in one place.
            </p>
          </div>
          <a href="sign_up" className="cta">
            Find out how
          </a>
        </div>
      </section>
      <section id="links">
        <h2>Useful links</h2>
        <ul>
          <li className="card">
            <h3>
              <a href="https://linguistics.ucla.edu/wp-content/uploads/2017/04/SSWLandTerraling_general.pdf">Supporting documents</a>
            </h3>
            <p>
              Hilda Koopman and Cristina Guardiano, 2018
            </p>
            <span className="h-divider" />
            <h3>
              <a href="https://linguistics.ucla.edu/wp-content/uploads/2017/04/Navigating-Terraling-1.pdf">Navigating TerraLing</a>
            </h3>
            <p>
              Hilda Koopman, 2018
            </p>
            <span className="h-divider" />
            <h3>
              <a href="https://groups.google.com/a/lists.ucla.edu/forum/#!forum/terraling">Become a member of our Terraling group</a>
            </h3>
            <p>
              via Google Groups
            </p>
          </li>
        </ul>
      </section>
      <section id="team">
        <h2>Meet our team</h2>
        <div className="copy">
          <p>
            Terraling is the result of a collaboration of linguists and computer scientists from NYU and
            UCLA over the past decade. It is based on original ideas of Chris Collins and Richard Kayne (NYU Linguistics), who envisioned a publicly accessible, open ended, language expert-oriented internet database (Collins and Kayne 2007).
          </p>
        </div>
        <div className="person">
          <h3>
            <a href="https://linguistics.ucla.edu/person/hilda-koopman/">Hilda Koopman</a>
          </h3>
          <p>
            has been involved in the project from the beginning, and is currently the main linguistic lead and editor.
          </p>
        </div>
        <div className="person">
          <h3>
            <a href="mailto:dennis@terraling.com">Dennis Shasha</a>
          </h3>
          <p>
            designed the system.
          </p>
        </div>
        <div className="person">
          <h3>
            <a href="mailto:hannan@terraling.com">Hannan Butt</a>
          </h3>
          <p>
            leads the developer team.
          </p>
        </div>
        <div className="person">
          <h3>
            <a href="https://shaile.sh">Shailesh Vasandani</a>
          </h3>
          <p>
            is a member of the developer team.
          </p>
        </div>
        <div className="people">
          <h3>Previous developers include:</h3>
          <ul>
            <li>
              <p>
                Marco Liberati
              </p>
            </li>
            <li>
              <p>
                Andrea Olivieri
              </p>
            </li>
            <li>
              <p>
                Linglian Zhang
              </p>
            </li>
            <li>
              <p>
                Oleg Grishin
              </p>
            </li>
            <li>
              <p>
                Alex Kaffenberger
              </p>
            </li>
            <li>
              <p>
                Alex Lobascio
              </p>
            </li>
            <li>
              <p>
                Sangeeta Vishwanath
              </p>
            </li>
            <li>
              <p>
                Hiral Rajani
              </p>
            </li>
            <li>
              <p>
                Jillian Kozyra
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section id="stinger">
        <div className="card">
          <h2>Ready to use the next generation of linguistic database?</h2>
          <a href="sign_up" className="cta">Sign up for Terraling</a>
        </div>
      </section>
    </main>
  )
}

export default Homepage;
