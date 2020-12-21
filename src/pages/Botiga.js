import React from 'react';
import BotigaGeneral from '../components/botiga/BotigaGeneral';
import PowerTitle from '../components/layout/PowerTitle';
import ProductBanner from '../components/botiga/ProductBanner';

function Botiga() {
  return (
    <div className="Botiga">
      <PowerTitle
        title="BOTIGA"
        // To Do adjust in two lines
        className="SupportTitle" />
        <ProductBanner title="fes-te soci/a d'ameba per 15€/any"/>
      <div className="BotigaContent">
        <BotigaGeneral/>
      </div>
    </div>
  );
}


export default Botiga;