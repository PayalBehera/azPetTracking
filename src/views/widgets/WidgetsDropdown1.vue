<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" header="9.823" text="Organizations">
        <template #default>
          <CDropdown color="transparent p-1" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>List View</CDropdownItem>
            <CDropdownItem>New Requests</CDropdownItem>
            <CDropdownItem>Billing Details</CDropdownItem>
            <CDropdownItem disabled>Show Full List</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="info"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol sm="6" lg="3">
      <!-- <CWidgetDropdown color="info" header="9.823" text="New Requests"> -->
      <CWidgetDropdown color="primary" header="19.823" text="Employees">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end" :caret="false">
            <template #toggler-content>
              <CIcon name="cil-location-pin" />
            </template>
            <CDropdownItem>View Employee List</CDropdownItem>
            <CDropdownItem>New Joinees</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 }}}"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol sm="6" lg="3">
      <!-- <CWidgetDropdown
        color="warning"
        header="9.823"
        text="Members online"
      >-->

      <CWidgetDropdown color="primary" header="9.823" text="New Requests">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height:70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 }}}"
            point-hover-background-color="warning"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <!-- <CWidgetDropdown color="danger" header="9.823" text="Members online"> -->
      <CWidgetDropdown color="primary" header="9.823" text="New Requests">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height:70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from "../charts/index.js";

export default {
  name: "WidgetsDropdown",
  components: { CChartLineSimple, CChartBarSimple }
};
</script>
