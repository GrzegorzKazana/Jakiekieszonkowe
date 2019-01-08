import React from "react";
import {
  Typography,
  Divider,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Switch,
  Collapse
} from "@material-ui/core";
import InputRange from "react-input-range";
//even tho its unused, it still needs to be imported for style to be applied
import xd from "react-input-range/lib/css/index.css";

class MapDrawerContentFilters extends React.Component {
  state = {
    ageRangeValue: { min: 0, max: 100 },
    filterByMoneyIncludes: false,
    moneyIncludes: [],
    schoolTypeId: -1
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!props.filterState) {
      return state;
    }
    return {
      ...state,
      ...props.filterState
    };
  };

  render() {
    const header = (
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          padding: "16px 16px 16px 16px"
        }}
      >
        <Typography variant="h4">Filtruj dane</Typography>
      </div>
    );

    const content = (
      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "0px",
          right: "0px",
          bottom: "68px",
          overflow: "auto",
          overflowX: "hidden",
          padding: "0px 16px 16px 16px"
        }}
      >
        <Divider style={{ margin: "0px 16px 16px 16px" }} />
        <Typography variant="subtitle1">Wiek dziecka</Typography>
        <div style={{ padding: "16px 0px" }}>
          <InputRange
            maxValue={100}
            minValue={0}
            value={this.state.ageRangeValue}
            onChange={ageRangeValue => this.setState({ ageRangeValue })}
          />
        </div>
        <Divider style={{ margin: "8px 0px" }} />
        <FormControl fullWidth margin="dense">
          <InputLabel htmlFor="name-simple">Rodzaj szkoły</InputLabel>
          <Select
            value={
              this.state.schoolTypeId === -1 ? "" : this.state.schoolTypeId
            }
            onChange={e => this.setState({ schoolTypeId: e.target.value })}
            input={<Input id="name-simple" />}
          >
            {this.props.schoolTypes.map((st, idx) => {
              return (
                <MenuItem value={st.id} key={idx}>
                  {st.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Divider style={{ margin: "8px 0px" }} />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.filterByMoneyIncludes}
              onChange={e =>
                this.setState({ filterByMoneyIncludes: e.target.checked })
              }
              // value="checkedB"
              color="primary"
            />
          }
          label="Filtruj według bonusów kieszonkowego"
        />
        <Collapse in={this.state.filterByMoneyIncludes}>
          {this.props.moneyIncludes.map((moneyInclude, idx) => (
            <FormControl fullWidth key={idx}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.moneyIncludes.includes(moneyInclude.id)}
                    onChange={(e, val) => {
                      this.setState(state => ({
                        ...state,
                        moneyIncludes: val
                          ? state.moneyIncludes.concat(moneyInclude.id)
                          : state.moneyIncludes.filter(
                              x => x !== moneyInclude.id
                            )
                      }));
                    }}
                  />
                }
                label={moneyInclude.name}
              />
            </FormControl>
          ))}
        </Collapse>
      </div>
    );

    const footer = (
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          right: "0px",
          padding: "0px 16px 16px 16px"
        }}
      >
        <Divider style={{ margin: "0px 16px 16px 16px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button
            variant="outlined"
            color="default"
            onClick={() => this.props.onResetClick(this.state)}
            style={{ flexGrow: "1" }}
          >
            Reset
          </Button>
          <div style={{ width: "16px" }} />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.props.onFilterClick(this.state)}
            style={{ flexGrow: "1" }}
          >
            Filtruj
          </Button>
        </div>
      </div>
    );
    return (
      <div
        style={{ height: "100%", position: "relative", ...this.props.style }}
      >
        {header}
        {content}
        {footer}
      </div>
    );
  }
}
export default MapDrawerContentFilters;
