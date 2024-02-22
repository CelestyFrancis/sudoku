import React from "react";
import { Input, Popover, PopoverBody, Button } from "reactstrap";
import "./Cell.css";

class PageHeader extends React.Component {
  toggle = () => {
    this.props.toggle(this.props.id);
  };
  render() {
    return (
      <React.Fragment>
        <Input
          style={this.props.invalid ? { backgroundColor: "#c13434" } : {}}
          id={`Popover${this.props.id}`}
          value={this.props.value === 0 ? "" : this.props.value}
          onChange={() => {}}
          disabled={this.props.disabled}
        ></Input>
        <Popover
          placement="right"
          isOpen={
            this.props.popoverOpen === this.props.id && !this.props.disabled
          }
          target={`Popover${this.props.id}`}
          toggle={this.toggle}
        >
          <PopoverBody>
            <div className="sudoku-popover-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                <li
                  key={`${this.props.id + item}`}
                  onClick={() => this.props.setFieldValue(this.props.id, item)}
                >
                  <center>
                    <Button className="sudoku-cell-close" size="sm">
                      {item}
                    </Button>
                  </center>
                </li>
              ))}
              <li
                onClick={() => this.props.setFieldValue(this.props.id, 0)}
                style={{ gridColumnStart: 2 }}
              >
                <center>
                  <Button className="sudoku-cell-close" size="sm">
                    -
                  </Button>
                </center>
              </li>
            </div>
          </PopoverBody>
        </Popover>
      </React.Fragment>
    );
  }
}

export default PageHeader;
