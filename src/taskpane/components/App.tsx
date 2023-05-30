import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";

/* global console, Excel, require  */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration",
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality",
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro",
        },
      ],
    });
  }

  click = async () => {
    try {
      await Excel.run(async (context) => {
        /**
         * Insert your Excel code here
         */
        // get selected range
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load("address");
        range.load("values");

        await context.sync();

        let totalsIndex = -1;
        range.values.map((rowVal, index) => {
          let sum = 0;
          rowVal.map((cellVal, index) => {
            // if cell value is null, log it
            if (!cellVal) {
              console.log("cell", index, cellVal, "is null");
            } else if (!isNaN(cellVal)) {
              // if cell value is a number, add it to the sum
              if (totalsIndex !== index) {
                sum += cellVal;
              }
            } else {
              // if cell value is not null or a number, check if it is "total"
              const val: string = cellVal;
              if (val.toUpperCase().trim() === "TOTAL") {
                // if cell value is "total", store the index
                totalsIndex = index;
              }
            }
          });
          if (sum) {
            if (totalsIndex === -1) {
              return;
            }
            // if sum exists and total index is not -1, set the value of the cell
            range.getCell(index, totalsIndex).values = [[sum]];
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo-filled.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo={require("./../../../assets/logo-filled.png")} title={this.props.title} message="Welcome" />
        <HeroList message="Discover what Office Add-ins can do for you today!" items={this.state.listItems}>
          <p className="ms-font-l">
            Modify the source files, then click <b>Run</b>.
          </p>
          <DefaultButton className="ms-welcome__action" iconProps={{ iconName: "ChevronRight" }} onClick={this.click}>
            Run
          </DefaultButton>
        </HeroList>
      </div>
    );
  }
}
