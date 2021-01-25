import React from 'react';
import BotigaGeneral from '../components/botiga/BotigaGeneral';
import PowerTitle from '../components/layout/PowerTitle';
import ProductBanner from '../components/botiga/ProductBanner';
import SociDialog from '../components/botiga/Soci';

function Botiga() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="Botiga">
      <PowerTitle
        title="BOTIGA"
        className="SupportTitle" />
      <div className="clickBanner" onClick={() => handleClick()}>
        <ProductBanner title="fes-te soci/a d'ameba per 15€/any" />
      </div>
      <SociDialog open={open}
        onClose={handleClick} />
      <div className="BotigaContent">
        <BotigaGeneral />
      </div>
    </div>
  );
}

export default Botiga;