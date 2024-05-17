import React from 'react'
import * as core from "@coreui/react";
import NewTable from '../../components/audit_component/newTable';
import NewWidget from '../../components/audit_component/newWidget'
import TabelaDetalhe from '../../components/audit_component/TabelaDetalhe'
import IcnDetailedTable from '../../components/audit_component/icnDetailedTable';

const Audit = ({ orgservices, userrole, formattedPhoneNumber }) => {
  return (
    <div>
        {orgservices.includes("AU_Portal") && (
        <core.CAccordion alwaysOpen activeItemKey={1}>
        <core.CAccordionItem itemKey={1}>
            <core.CAccordionHeader>AUDIT</core.CAccordionHeader>
            <core.CAccordionBody>
            {(userrole.includes("superAdm") || userrole.includes("admin") || userrole.includes("analyst")) ? (
            <NewWidget userrole={userrole}/>
            ):null}
            <NewTable />
            <TabelaDetalhe />
            <IcnDetailedTable formattedPhoneNumber={formattedPhoneNumber} />
            </core.CAccordionBody>
        </core.CAccordionItem>
        </core.CAccordion>
      )}
    </div>
  )
}

export default Audit
