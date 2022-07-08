import { useState, useEffect } from "react";
import styled from "styled-components";
import { Inner } from "../../pages/index";

const Abonnements = ({ abonnements }) => {
  const [total, setTotal] = useState(null);

  // State values must be from /studio/schemas/abonnements.js "<type>_OPTIONS"

  // type (ex: regular, student, institution)
  const [type, setType] = useState("regular");
  // duration (ex: 1 year, 2 years)
  const [duration, setDuration] = useState("1 an");
  // location (ex: Canada, USA, International)
  const [location, setLocation] = useState("canada");

  const handleChangeType = (e) => {
    // When a radio box is clicked, set the state to the value of the clicked element
    setType(e.target.value);
    // Then, update the product filter
    handleFilterTypeUpdate(e);
  };
  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const [activeParams, setActiveParams] = useState(["regular"]);
  const [filteredAbonnements, setFilteredAbonnements] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:.
  //
  //  Handler for setting the activeParams state
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:.
  const handleFilterTypeUpdate = (e) => {
    let currentParams = activeParams;

    if (currentParams.includes(e.target.value)) {
      return;
    } else {
      setActiveParams([e.target.value]);
    }
    // SelectedCount updates the useEffect, keeping track of the changes to the filter params
    setSelectedCount(currentParams.length);
  };

  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:
  //
  //  Apply the filter, then return the corresponding abonnement
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:
  useEffect(() => {
    let newData;

    if (selectedCount === 0) {
      // on initialization, filter by default params
      newData = abonnements.filter((item) => {
        if (type.includes(item.type)) {
          return item;
        }
      });
    } else {
      newData = abonnements.filter((item) => {
        if (type.includes(item.type)) {
          return item;
        }
      });
    }
    setFilteredAbonnements(newData);
  }, [selectedCount, type]);

  console.log("filtered:", filteredAbonnements);

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
            <h3>Total: {total}</h3>
            <div>
              <small>add to cart</small>
            </div>
          </Left>
          <Form
          // onSubmit={(e) => handleSubmit()}
          // onChange={handleSubmit}
          >
            <RadioWrapper>
              <small>Type de plan</small>
              <RadioGroup>
                <label htmlFor="regular">
                  <h3>Regulier</h3>
                  <input
                    // checked={type === "regular"}
                    onClick={(e) => handleChangeType(e)}
                    type="radio"
                    name="type"
                    id="regular"
                    value="regular"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label htmlFor="student">
                  <h3>Étudiant</h3>
                  <input
                    // checked={type === "student"}
                    onClick={(e) => handleChangeType(e)}
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
                    // checked={type === "institution"}
                    onClick={(e) => handleChangeType(e)}
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
                    checked={duration === "1 an"}
                    onChange={handleChangeDuration}
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
                    checked={duration === "2 ans"}
                    onChange={handleChangeDuration}
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
                    checked={location === "canada"}
                    onChange={handleChangeLocation}
                    type="radio"
                    name="location"
                    id="canada"
                    value="canada"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label htmlFor="international">
                  <h3>À l'international</h3>
                  <input
                    checked={location === "international"}
                    onChange={handleChangeLocation}
                    type="radio"
                    name="location"
                    id="international"
                    value="international"
                  />
                  <CheckMark />
                </label>
              </RadioGroup>
              <RadioGroup>
                <label htmlFor="usa">
                  <h3>Aux États-Unis</h3>
                  <input
                    checked={location === "usa"}
                    onChange={handleChangeLocation}
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
`;

const Left = styled.div`
  width: 45%;
  position: sticky;
  top: 7rem;

  h3 {
    font-family: "Surt";
  }
`;

const Form = styled.form`
  width: 55%;
  position: relative;
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
  /* transition: var(--transition); */
  /* cursor: pointer; */
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
`;
