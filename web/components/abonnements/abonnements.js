import { useState, useEffect } from "react";
import styled from "styled-components";
import { Inner } from "../../pages/index";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { breakpoints } from "../../utils/breakpoints";

const Abonnements = ({ abonnements }) => {
  const { addItem } = useShoppingCart();

  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:.
  //
  //  Create state & handlers for each filter
  //
  //    State values must match /studio/schemas/abonnements.js "<...>_OPTIONS".
  //    Possible values are:
  //      - TYPE_OPTIONS (regular, student, institution)
  //      - DURATION_OPTIONS (1 year, 2 years)
  //      - LOCATION_OPTIONS (canada, usa, international)
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:.

  const [type, setType] = useState("regular");
  const [duration, setDuration] = useState("1 an");
  const [location, setLocation] = useState("canada");

  // State for filtering the {abonnements}
  const [filteredAbonnements, setFilteredAbonnements] = useState([]);

  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:
  //
  //  Apply the filter, then return the corresponding abonnement
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:
  useEffect(() => {
    let filteredData;
    filteredData = abonnements.filter((item) => {
      if (
        type.includes(item.type) &&
        duration.includes(item.duration) &&
        location.includes(item.location)
      ) {
        return item;
      }
    });
    setFilteredAbonnements(filteredData);
  }, [type, duration, location]);

  return (
    <Wrapper>
      <Inner>
        <MainFlex>
          <Left>
            <Header>
              <h1>Abonnements</h1>
              <p>
                La revue Mœbius est publiée à raison de quatre numéros par
                année. Les taxes et frais postaux sont inclus dans les tarifs.
                Pour l’abonnement numérique, veuillez vous rendre sur le site
                web de la SODEP ou sur Érudit.
              </p>
            </Header>
            <AddProductWrapper>
              <h3>
                Total:{" "}
                {filteredAbonnements.length &&
                  formatCurrencyString({
                    value: filteredAbonnements[0]?.price,
                    currency: filteredAbonnements[0]?.currency,
                  })}
              </h3>
              <Button
                aria-label="Ajouter au panier"
                onClick={() => addItem(filteredAbonnements[0])}
              >
                <small>Ajouter au panier</small>
              </Button>
            </AddProductWrapper>
          </Left>
          <Form>
            <RadioWrapper>
              <small>Type de plan</small>
              <RadioGroup>
                <label htmlFor="regular">
                  <h3>Regulier</h3>
                  <input
                    defaultChecked={true}
                    onClick={(e) => setType(e.target.value)}
                    type="radio"
                    name="type"
                    id="regular"
                    value="regular"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label
                  htmlFor="student"
                  style={{
                    cursor: location === "canada" ? "pointer" : "not-allowed",
                  }}
                >
                  <h3
                    style={{
                      opacity: location === "canada" ? "1" : ".5",
                      cursor: location === "canada" ? "pointer" : "not-allowed",
                      transition: "var(--transition)",
                    }}
                  >
                    Étudiant
                  </h3>
                  <input
                    disabled={location !== "canada"}
                    onClick={(e) => setType(e.target.value)}
                    type="radio"
                    name="type"
                    id="student"
                    value="student"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label htmlFor="institution">
                  <h3>Institution</h3>
                  <input
                    onClick={(e) => setType(e.target.value)}
                    type="radio"
                    name="type"
                    id="institution"
                    value="institution"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
            </RadioWrapper>
            <RadioWrapper>
              <small>Years</small>
              <RadioGroup>
                <label htmlFor="1 an">
                  <h3>Un an</h3>
                  <input
                    defaultChecked={true}
                    onClick={(e) => setDuration(e.target.value)}
                    type="radio"
                    name="duration"
                    id="1 an"
                    value="1 an"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label htmlFor="2 ans">
                  <h3>Deux ans</h3>
                  <input
                    onClick={(e) => setDuration(e.target.value)}
                    type="radio"
                    name="duration"
                    id="2 ans"
                    value="2 ans"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
            </RadioWrapper>
            <RadioWrapper>
              <small>Country</small>
              <RadioGroup>
                <label htmlFor="canada">
                  <h3>Au Canada</h3>
                  <input
                    defaultChecked={true}
                    onClick={(e) => setLocation(e.target.value)}
                    type="radio"
                    name="location"
                    id="canada"
                    value="canada"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label
                  htmlFor="international"
                  style={{
                    cursor: type === "student" ? "not-allowed" : "pointer",
                  }}
                >
                  <h3
                    style={{
                      opacity: type === "student" ? "0.5" : 1,
                      cursor: type === "student" ? "not-allowed" : "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    À l'international
                  </h3>
                  <input
                    disabled={type === "student"}
                    onClick={(e) => setLocation(e.target.value)}
                    type="radio"
                    name="location"
                    id="international"
                    value="international"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label
                  htmlFor="usa"
                  style={{
                    cursor: type === "student" ? "not-allowed" : "pointer",
                  }}
                >
                  <h3
                    style={{
                      opacity: type === "student" ? "0.5" : 1,
                      cursor: type === "student" ? "not-allowed" : "pointer",
                      transition: "var(--transition)",
                    }}
                  >
                    Aux États-Unis
                  </h3>
                  <input
                    disabled={type === "student"}
                    onClick={(e) => setLocation(e.target.value)}
                    type="radio"
                    name="location"
                    id="usa"
                    value="usa"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
            </RadioWrapper>
          </Form>
          <AddProductMobileWrapper>
            <h3>
              Total:{" "}
              {filteredAbonnements.length &&
                formatCurrencyString({
                  value: filteredAbonnements[0]?.price,
                  currency: filteredAbonnements[0]?.currency,
                })}
            </h3>
            <Button
              aria-label="Ajouter au panier"
              onClick={() => addItem(filteredAbonnements[0])}
            >
              <small>Ajouter au panier</small>
            </Button>
          </AddProductMobileWrapper>
        </MainFlex>
      </Inner>
    </Wrapper>
  );
};

export default Abonnements;

const Wrapper = styled.div`
  background: var(--color-clay);
  color: var(--static-cream);
  padding: 10rem 0;

  @media (max-width: ${breakpoints.l}px) {
    padding: 5rem 0;
  }
  @media (max-width: ${breakpoints.s}px) {
    padding: 1rem 0;
  }
`;

const Header = styled.div`
  width: 90%;
  margin-bottom: 4rem;
  h1 {
    margin-bottom: 2rem;
    line-height: 100%;
  }
`;

const MainFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 10rem 0;

  @media (max-width: ${breakpoints.l}px) {
    display: block;
    padding: 3rem 0;
  }
`;

const Left = styled.div`
  width: 45%;
  position: sticky;
  top: 7rem;
  @media (max-width: ${breakpoints.l}px) {
    top: 0;
    position: relative;
    width: 100%;
  }
`;

const Button = styled.button`
  display: inline-block;
  margin: 2rem 0;
  padding: 1rem 3rem;
  border-radius: 10px;
  background: none;
  border: 1px solid var(--static-cream) !important;
  color: var(--static-cream);
  transition: var(--transition);

  :hover {
    background: var(--static-cream) !important;
    color: var(--color-clay) !important;
  }

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    width: 100%;
  }
`;

const Form = styled.form`
  width: 55%;
  position: relative;

  @media (max-width: ${breakpoints.l}px) {
    width: 100%;
    display: block;
  }
`;

const RadioWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  h3 {
    display: inline-block;
    font-family: "Surt";
    margin-left: 2rem;
    cursor: pointer;
    line-height: 100%;
  }

  :first-child {
    border-top: 1px solid var(--static-cream);
  }
  border-bottom: 1px solid var(--static-cream);

  @media (max-width: ${breakpoints.m}px) {
    h3 {
      margin-left: 0.5rem;
    }
  }
  @media (max-width: ${breakpoints.s}px) {
    h3 {
      font-size: 35px;
    }
  }
`;

const AddProductWrapper = styled.div`
  h3 {
    font-family: "Surt";
  }
  @media (max-width: ${breakpoints.l}px) {
    display: none;
  }
`;
const AddProductMobileWrapper = styled.div`
  h3 {
    font-family: "Surt";
  }
  display: none;
  @media (max-width: ${breakpoints.l}px) {
    display: block;
    margin-top: 3rem;
  }
  @media (max-width: ${breakpoints.s}px) {
    h3 {
      font-size: 35px;
    }
  }
`;

const CheckMark = styled.span`
  // create a custom radio button
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 35px;
  width: 35px;
  background-color: var(--color-clay);
  border: 2px solid var(--static-cream);
  border-radius: 50%;

  @media (max-width: ${breakpoints.l}px) {
    width: 25px;
    height: 25px;
  }
`;

const RadioGroup = styled.span`
  margin-top: 2rem;

  h3 {
    cursor: pointer;
  }
  input {
    // hide the browser's default radio button
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  label {
    height: 100%;
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* On mouse-over, add a grey background color */
  :hover input ~ ${CheckMark} {
    background-color: #ccc;
    transition: var(--transition);
  }
  /* When the radio button is checked, add a blue background */
  input:checked ~ ${CheckMark} {
    transition: var(--transition);
    background-color: var(--static-cream);
  }

  input:disabled ~ ${CheckMark} {
    transition: var(--transition);
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.m}px) {
    margin-top: 1rem;
  }
`;
